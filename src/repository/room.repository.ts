import { IRoom } from "../models/room.model.ts";
import { Injectable, Inject } from "../../deps.ts";
import PlopContext from "./plop.context.ts";

@Injectable()
export class RoomRepository {
  constructor(@Inject(PlopContext) private context: PlopContext) {}

  async getRoomAsync(id: string): Promise<IRoom> {
    return await this.context.rooms().findOne({ _id: { $oid: id } });
  }

  async existsAsync(id: string): Promise<boolean> {
    return (await this.context.rooms().findOne({ _id: { $oid: id } })) !==
      undefined;
  }

  async createRoomAsync(room: IRoom): Promise<IRoom> {
    const id = await this.context.rooms().insertOne(room);
    return { ...room, _id: id };
  }

  async updateRoomAsync(room: IRoom): Promise<IRoom> {
    await this.context.rooms().updateOne({ _id: room._id }, room);
    return { ...room };
  }

  async deleteRoomAsync(id: string): Promise<any> {
    await this.context.rooms().deleteOne({ _id: { $oid: id } });
  }
}
