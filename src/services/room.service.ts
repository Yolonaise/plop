import { Injectable, Inject, Producer } from "../../deps.ts";
import { RoomRepository } from "../repository/room.repository.ts";
import { IRoom } from "../models/room.model.ts";
import { Rabbit } from "./rabbit.service.ts";
import { createRoomCreated, createRoomUpdated, createRoomDeleted } from "../models/rabbit/helper/rooms.factory.ts";

@Injectable()
export class RoomService {
  constructor(@Inject(RoomRepository) private repo: RoomRepository, @Inject(Rabbit) private rabbit: Rabbit) {
  }

  async getRoomAsync(id: string): Promise<IRoom> {
    return await this.repo.getRoomAsync(id);
  }

  async createRoomAsync(room: IRoom): Promise<IRoom> {
    const res = await this.repo.createRoomAsync(room);
    
    await (await this.rabbit.getRoomProducerAsync())
      .send(createRoomCreated(res));

    return res;
  }

  async updateRoomAsync(room: IRoom): Promise<IRoom> {
    if (!await this.repo.existsAsync(room._id.$oid)) {
      throw (`room (${room._id.$oid}) not found`);
    }
    const res =  await this.repo.updateRoomAsync(room);

    await (await this.rabbit.getRoomProducerAsync())
      .send(createRoomUpdated(res));

    return res;
  }

  async deleteRoomAsync(id: string): Promise<any> {
    await this.repo.deleteRoomAsync(id);

    await (await this.rabbit.getRoomProducerAsync())
      .send(createRoomDeleted(id));
  }
}
