import {
  Inject,
  Content,
  NotFoundError,
  Injectable,
} from "../../deps.ts";
import { DeviceRepository } from "../repository/device.repository.ts";
import { IDevice } from "../models/device.model.ts";
import { DeviceValidator } from "./validators/device.validator.ts";
import { Rabbit } from "./rabbit.service.ts";
import {
  createDeviceCreated,
  createDeviceUpdated,
  createDeviceDeleted,
} from "../models/rabbit/helper/device.factory.ts";

@Injectable()
export class DeviceService {
  constructor(
    @Inject(DeviceRepository) private repo: DeviceRepository,
    @Inject(DeviceValidator) private validator: DeviceValidator,
    @Inject(Rabbit) private rabbit: Rabbit,
  ) {}

  async getAllAsync(): Promise<IDevice[]> {
    return await this.repo.getAllAsync();
  }

  async getDeviceAsync(id: string): Promise<IDevice> {
    this.validator.onGet(id);
    return await this.repo.getDeviceAsync(id);
  }

  async createDeviceAsync(Device: IDevice): Promise<IDevice> {
    this.validator.onCreate(Device);
    const res = await this.repo.createDeviceAsync(Device);
    await (await this.rabbit.getDeviceProducerAsync())
      .send(createDeviceCreated(res));

    return res;
  }

  async updateDeviceAsync(Device: IDevice): Promise<IDevice> {
    this.validator.onUpdate(Device);

    if (!await this.repo.existsAsync(Device._id.$oid)) {
      throw new NotFoundError("No Device found");
    }

    const res = await this.repo.updateDeviceAsync(Device);
    await (await this.rabbit.getDeviceProducerAsync())
      .send(createDeviceUpdated(res));

    return res;
  }

  async deleteDeviceAsync(id: string): Promise<any> {
    this.validator.onDelete(id);
    await this.repo.deleteDeviceAsync(id);

    await (await this.rabbit.getDeviceProducerAsync())
      .send(createDeviceDeleted(id));

    return Content(undefined, 204);
  }
}
