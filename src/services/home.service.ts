import {
  Injectable,
  Inject,
  Content,
  NotFoundError,
  IHome,
  createHomeCreated,
  createHomeUpdated,
  createHomeDeleted,
} from "./../../deps.ts";
import { HomeRepository } from "../repository/home.repository.ts";
import { Rabbit } from "./rabbit.service.ts";
import { HomeValidator } from "./validators/home.validator.ts";
import { FloorRepository } from "../repository/floor.repository.ts"
import { mapToIds } from "../helpers/mongo.helper.ts";

@Injectable()
export class HomeService {
  constructor(
    @Inject(HomeRepository) private repo: HomeRepository,
    @Inject(FloorRepository) private floorRepo : FloorRepository,
    @Inject(Rabbit) private rabbit: Rabbit,
    @Inject(HomeValidator) private validator: HomeValidator,
  ) {}

  async getAllAsync(): Promise<IHome[]> {
    return await this.repo.getAllAsync();
  }

  async getHomeAsync(id: string): Promise<IHome | null> {
    this.validator.onGet(id);
    return await this.repo.getHomeAsync(id);
  }

  async createHomeAsync(home: IHome): Promise<IHome> {
    this.validator.onCreate(home);
    
    await this.validateFloors(home);
    const res = await this.repo.createHomeAsync(home);
    await (await this.rabbit.getHomeProducerAsync())
      .send(createHomeCreated(res));

    return res;
  }

  async updateHomeAsync(home: IHome): Promise<IHome> {
    this.validator.onUpdate(home);

    if (!await this.repo.existsAsync(home._id.$oid)) {
      throw new NotFoundError("No home found");
    }

    await this.validateFloors(home);
    const res = await this.repo.updateHomeAsync(home);
    await (await this.rabbit.getHomeProducerAsync())
      .send(createHomeUpdated(res));

    return res;
  }

  async deleteHomeAsync(id: string): Promise<any> {
    this.validator.onDelete(id);
    const home = await this.repo.getHomeAsync(id);
    if(home == null)
      throw new NotFoundError("No home found");

    home.floors.forEach(async(f) => {
      this.floorRepo.deleteFloorAsync(f);
    });

    await this.repo.deleteHomeAsync(id);
    await (await this.rabbit.getHomeProducerAsync())
      .send(createHomeDeleted(id));

    return Content(undefined, 204);
  }

  async validateFloors(home: IHome): Promise<any> {
    if(!home.floors) {
      home.floors = [];
      return;
    }

    const exists = (await this.floorRepo
      .getFilteredAsync({ floors: { $all: mapToIds(home.floors) } })).map((d) =>
        d._id.$oid
      );
    
    (await this.repo.getFilteredAsync({ floors: { $all: exists } }))
      .forEach(async (h) => {
        if (h._id === home._id)
          return;
        home.floors = h.floors.filter((i) => !exists.includes(i));
      });
  }
}
