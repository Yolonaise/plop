import { Injectable, Inject } from "../../deps.ts";
import { RoomRepository } from "../repository/room.repository.ts";
import { IRoom } from "../models/room.model.ts";

@Injectable()
export class RoomService {
  constructor(@Inject(RoomRepository) private repo: RoomRepository) {
  }

  async getRoomAsync(id: string): Promise<IRoom> {
    return await this.repo.getRoomAsync(id);
  }

  async createRoomAsync(room: IRoom): Promise<IRoom> {
    return await this.repo.createRoomAsync(room);
  }

  async updateRoomAsync(room: IRoom): Promise<IRoom> {
    if (!await this.repo.existsAsync(room._id.$oid)) {
      throw (`room (${room._id.$oid}) not found`);
    }
    return await this.repo.updateRoomAsync(room);
  }

  async deleteRoomAsync(id: string): Promise<any> {
    await this.repo.deleteRoomAsync(id);
  }
}
