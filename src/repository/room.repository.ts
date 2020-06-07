import { IRoom } from "../models/room.model.ts";
import { Injectable, Inject } from "../../deps.ts";
import PlopContext from "./plop.context.ts";

@Injectable()
export class RoomRepository {
  constructor(@Inject(PlopContext) private context: PlopContext) {}

  async getAllAsync(): Promise<IRoom[]> {
    return await this.context.sendRequestAsync(
      this.context.rooms(),
      (c) => c.find(),
    );
  }

  async getFilteredAsync(filter: object): Promise<IRoom[]> {
    return await this.context.sendRequestAsync(
      this.context.rooms(),
      (c) => c.find(filter),
    );
  }

  async getRoomAsync(id: string): Promise<IRoom> {
    return await this.context.sendRequestAsync(
      this.context.rooms(),
      (c) => c.findOne({ _id: { $oid: id } }),
    );
  }

  async existsAsync(id: string): Promise<boolean> {
    const res = await this.context.sendRequestAsync(
      this.context.rooms(),
      (c) => c.findOne({ _id: { $oid: id } }),
    );
    return res != undefined;
  }

  async createRoomAsync(room: IRoom): Promise<IRoom> {
    delete room._id;
    const id = await this.context.sendRequestAsync(
      this.context.rooms(),
      (c) => c.insertOne(room),
    );
    return { ...room, _id: id };
  }

  async updateRoomAsync(room: IRoom): Promise<IRoom> {
    await this.context.sendRequestAsync(
      this.context.rooms(),
      (c) => c.updateOne({ _id: room._id }, room),
    );
    return { ...room };
  }

  async deleteRoomAsync(id: string): Promise<any> {
    await this.context.sendRequestAsync(
      this.context.rooms(),
      (c) => c.deleteOne({ _id: { $oid: id } }),
    );
  }
}
