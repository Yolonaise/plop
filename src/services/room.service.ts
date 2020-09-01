import {
  Injectable,
  Inject,
  Content,
  NotFoundError,
  IRoom,
  createRoomCreated,
  createRoomUpdated,
  createRoomDeleted,
} from "./../../deps.ts";
import { RoomRepository } from "../repository/room.repository.ts";
import { Rabbit } from "./rabbit.service.ts";
import { RoomValidator } from "./validators/room.validator.ts";
import { DeviceRepository } from "../repository/device.repository.ts";
import { mapToIds } from "../helpers/mongo.helper.ts";

@Injectable()
export class RoomService {
  constructor(
    @Inject(RoomRepository) private repo: RoomRepository,
    @Inject(DeviceRepository) private deviceRepo: DeviceRepository,
    @Inject(Rabbit) private rabbit: Rabbit,
    @Inject(RoomValidator) private validator: RoomValidator,
  ) {}

  async getAllAsync(): Promise<IRoom[]> {
    return await this.repo.getAllAsync();
  }

  async getRoomAsync(id: string): Promise<IRoom | null> {
    this.validator.onGet(id);
    return await this.repo.getRoomAsync(id);
  }

  async createRoomAsync(room: IRoom): Promise<IRoom> {
    this.validator.onCreate(room);
    await this.validateDevices(room);
    const res = await this.repo.createRoomAsync(room);
    await (await this.rabbit.getRoomProducerAsync())
      .send(createRoomCreated(res));

    return res;
  }

  async updateRoomAsync(room: IRoom): Promise<IRoom> {
    this.validator.onUpdate(room);

    if (!await this.repo.existsAsync(room._id.$oid)) {
      throw new NotFoundError("No room found");
    }

    await this.validateDevices(room);
    const res = await this.repo.updateRoomAsync(room);
    await (await this.rabbit.getRoomProducerAsync())
      .send(createRoomUpdated(res));

    return res;
  }

  async deleteRoomAsync(id: string): Promise<any> {
    this.validator.onDelete(id);
    await this.repo.deleteRoomAsync(id);

    await (await this.rabbit.getRoomProducerAsync())
      .send(createRoomDeleted(id));

    return Content(undefined, 204);
  }

  async validateDevices(room: IRoom): Promise<any> {
    if (!room.devices) {
      return;
    }

    const exists = (await this.deviceRepo
      .getFilteredAsync({ _id: { $all: mapToIds(room.devices) } })).map((d) =>
        d._id.$oid
      );

    (await this.repo.getFilteredAsync({ devices: { $all: exists } }))
      .forEach(async (r) => {
        if (r._id === room._id) {
          return;
        }
        r.devices = r.devices.filter((i) => !exists.includes(i));
        await this.repo.updateRoomAsync(r);
      });

    room.devices = exists;
  }
}
