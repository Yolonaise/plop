import { Injectable, Inject, IRoom, ObjectId } from "../../deps.ts";
import PlopContext from "./plop.context.ts";

@Injectable()
export class RoomRepository {
  constructor(@Inject(PlopContext) private context: PlopContext) {}

  async getAllAsync(): Promise<IRoom[]> {
    return await this.context.rooms().find();
  }

  async getFilteredAsync(filter: object): Promise<IRoom[]> {
    return await this.context.rooms().find(filter);
  }

  async getRoomAsync(id: string): Promise<IRoom | null> {
    return await this.context.rooms().findOne({ _id: ObjectId(id) });
  }

  async existsAsync(id: string): Promise<boolean> {
    return await this.getRoomAsync(id) != undefined;
  }

  async createRoomAsync(room: IRoom): Promise<IRoom> {
    const id = await this.context.rooms().insertOne(room);
    return { ...room, _id: id };
  }

  async updateRoomAsync(room: IRoom): Promise<IRoom> {
    return await this.context.rooms().updateOne({ _id: room._id }, room);
  }

  async deleteRoomAsync(id: string): Promise<any> {
    await this.context.rooms().deleteOne({ _id: ObjectId(id) });
  }
}
