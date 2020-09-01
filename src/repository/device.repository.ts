import { Injectable, Inject, IDevice, ObjectId } from "../../deps.ts";
import PlopContext from "./plop.context.ts";

@Injectable()
export class DeviceRepository {

  constructor(@Inject(PlopContext) private context: PlopContext) {}

  async existsAsync(id: string): Promise<boolean> {
    return await this.getDeviceAsync(id) !== undefined;
  }

  async getAllAsync(): Promise<IDevice[]> {
    return await this.context.devices().find();
  }

  async getFilteredAsync(filter: object): Promise<IDevice[]> {
    return await this.context.devices().find(filter);
  }

  async getDeviceAsync(id: string): Promise<IDevice | null> {
    return await this.context.devices().findOne({ _id: ObjectId(id) });
  }

  async createDeviceAsync(device: IDevice): Promise<IDevice> {
    const id = await this.context.devices().insertOne(device)
    return { ...device, _id: id };
  }

  async updateDeviceAsync(device: IDevice): Promise<IDevice> {
    return await this.context.devices().updateOne({ _id: device._id }, device)
  }

  async deleteDeviceAsync(id: string): Promise<any> {
    await this.context.devices().deleteOne({ _id: ObjectId(id) })
  }
}
