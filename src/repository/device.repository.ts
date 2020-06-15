import {
  Injectable,
  Inject,
} from "../../deps.ts";
import { IDevice } from "../models/device.model.ts";
import PlopContext from "./plop.context.ts";

@Injectable()
export class DeviceRepository {
  constructor(@Inject(PlopContext) private context: PlopContext) {}

  async existsAsync(id: string): Promise<boolean> {
    const res = await this.context.sendRequestAsync(
      this.context.devices(),
      (c) => c.findOne({ _id: { $oid: id } }),
    );
    return res !== undefined;
  }

  async getAllAsync(): Promise<IDevice[]> {
    return await this.context.sendRequestAsync(
      this.context.devices(),
      (c) => c.find(),
    );
  }

  async getFilteredAsync(filter: object): Promise<IDevice[]> {
    return await this.context.sendRequestAsync(
      this.context.devices(),
      (c) => c.find(filter),
    );
  }

  async getDeviceAsync(id: string): Promise<IDevice> {
    return await this.context.sendRequestAsync(
      this.context.devices(),
      (c) => c.findOne({ _id: { $oid: id } }),
    );
  }

  async createDeviceAsync(device: IDevice): Promise<IDevice> {
    delete device._id;
    const id = await this.context.sendRequestAsync(
      this.context.devices(),
      (c) => c.insertOne(device),
    );
    return { ...device, _id: id };
  }

  async updateDeviceAsync(device: IDevice): Promise<IDevice> {
    return await this.context.sendRequestAsync(
      this.context.devices(),
      (c) => c.updateOne({ _id: device._id }, device),
    );
  }

  async deleteDeviceAsync(id: string): Promise<any> {
    await this.context.sendRequestAsync(
      this.context.devices(),
      (c) => c.deleteOne({ _id: { $oid: id } }),
    );
  }
}
