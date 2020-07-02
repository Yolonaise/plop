import {
  Injectable,
  Inject,
  Content,
  NotFoundError,
  IFloor,
  createFloorCreated,
  createFloorUpdated,
  createFloorDeleted,
} from "./../../deps.ts";
import { FloorRepository } from "../repository/floor.repository.ts";
import { Rabbit } from "./rabbit.service.ts";
import { FloorValidator } from "./validators/floor.validator.ts";
import { mapToIds } from "../helpers/mongo.helper.ts";
import { HomeRepository } from "../repository/home.repository.ts";
import { RoomRepository } from "../repository/room.repository.ts";

@Injectable()
export class FloorService {
  constructor(
    @Inject(FloorRepository) private repo: FloorRepository,
    @Inject(HomeRepository) private homeRepo: HomeRepository,
    @Inject(RoomRepository) private roomRepo: RoomRepository,
    @Inject(Rabbit) private rabbit: Rabbit,
    @Inject(FloorValidator) private validator: FloorValidator,
  ) {}

  async getAllAsync(): Promise<IFloor[]> {
    return await this.repo.getAllAsync();
  }

  async getFloorAsync(id: string): Promise<IFloor> {
    this.validator.onGet(id);
    return await this.repo.getFloorAsync(id);
  }

  async createFloorAsync(floor: IFloor): Promise<IFloor> {
    this.validator.onCreate(floor);
    await this.validateRooms(floor);
    const res = await this.repo.createFloorAsync(floor);
    await (await this.rabbit.getFloorProducerAsync())
      .send(createFloorCreated(res));

    return res;
  }

  async updateFloorAsync(floor: IFloor): Promise<IFloor> {
    this.validator.onUpdate(floor);

    if (!await this.repo.existsAsync(floor._id.$oid)) {
      throw new NotFoundError("No floor found");
    }

    await this.validateRooms(floor);
    const res = await this.repo.updateFloorAsync(floor);
    await (await this.rabbit.getFloorProducerAsync())
      .send(createFloorUpdated(res));

    return res;
  }

  async deleteFloorAsync(id: string): Promise<any> {
    this.validator.onDelete(id);
    await this.repo.deleteFloorAsync(id);

    (await this.homeRepo.getFilteredAsync({ floors: { $all: [id] } }))
      .forEach(async (h) => {
        this.homeRepo.updateHomeAsync({...h, floors: h.floors.filter((v) => v !== id)})
      });

    await (await this.rabbit.getFloorProducerAsync())
      .send(createFloorDeleted(id));

    return Content(undefined, 204);
  }

  async validateRooms(floor: IFloor): Promise<any> {
    if (!floor.rooms) {
      return;
    }

    const exists = (await this.roomRepo
      .getFilteredAsync({ _id: { $all: mapToIds(floor.rooms) } })).map((d) =>
        d._id.$oid
      );

    (await this.repo.getFilteredAsync({ rooms: { $all: exists } }))
      .forEach(async (r) => {
        if (r._id === floor._id) {
          return;
        }
        r.rooms = r.rooms.filter((i) => !exists.includes(i));
        await this.repo.updateFloorAsync(r);
      });

    floor.rooms = exists;
  }
}
