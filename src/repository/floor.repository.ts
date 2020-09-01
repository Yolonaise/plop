import { Injectable, Inject, IFloor, ObjectId } from "../../deps.ts";
import PlopContext from "./plop.context.ts";

@Injectable()
export class FloorRepository {

  constructor(@Inject(PlopContext) private context: PlopContext) {}

  async getAllAsync(): Promise<IFloor[]> {
    return await this.context.floors().find();
  }

  async getFilteredAsync(filter: object): Promise<IFloor[]> {
    return await this.context.floors().find(filter);
  }

  async getFloorAsync(id: string): Promise<IFloor | null> {
    return await this.context.floors().findOne({ _id: ObjectId(id) });
  }

  async existsAsync(id: string): Promise<boolean> {
    return await this.getFloorAsync(id) != undefined;
  }

  async createFloorAsync(floor: IFloor): Promise<IFloor> {
    const id = await this.context.floors().insertOne(floor);
    return { ...floor, _id: id };
  }

  async updateFloorAsync(floor: IFloor): Promise<IFloor> {
    return await this.context.floors().updateOne({ _id: floor._id }, floor);
  }

  async deleteFloorAsync(id: string): Promise<any> {
    await this.context.floors().deleteOne({ _id: ObjectId(id) });
  }
}
