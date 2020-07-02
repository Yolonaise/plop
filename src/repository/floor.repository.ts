import { Injectable, Inject, IFloor } from "../../deps.ts";
import PlopContext from "./plop.context.ts";

@Injectable()
export class FloorRepository {
  constructor(@Inject(PlopContext) private context: PlopContext) {}

  async getAllAsync(): Promise<IFloor[]> {
    return await this.context.sendRequestAsync(
      this.context.floors(),
      (c) => c.find(),
    );
  }

  async getFilteredAsync(filter: object): Promise<IFloor[]> {
    return await this.context.sendRequestAsync(
      this.context.floors(),
      (c) => c.find(filter),
    );
  }

  async getFloorAsync(id: string): Promise<IFloor> {
    return await this.context.sendRequestAsync(
      this.context.floors(),
      (c) => c.findOne({ _id: { $oid: id } }),
    );
  }

  async existsAsync(id: string): Promise<boolean> {
    const res = await this.context.sendRequestAsync(
      this.context.floors(),
      (c) => c.findOne({ _id: { $oid: id } }),
    );
    return res != undefined;
  }

  async createFloorAsync(floor: IFloor): Promise<IFloor> {
    delete floor._id;
    const id = await this.context.sendRequestAsync(
      this.context.floors(),
      (c) => c.insertOne(floor),
    );
    return { ...floor, _id: id };
  }

  async updateFloorAsync(floor: IFloor): Promise<IFloor> {
    await this.context.sendRequestAsync(
      this.context.floors(),
      (c) => c.updateOne({ _id: floor._id }, floor),
    );
    return { ...floor };
  }

  async deleteFloorAsync(id: string): Promise<any> {
    await this.context.sendRequestAsync(
      this.context.floors(),
      (c) => c.deleteOne({ _id: { $oid: id } }),
    );
  }
}
