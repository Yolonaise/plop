import { IRoom } from '../models/room.model.ts';
import { Injectable } from '../../deps.ts';

const db:{[id: string] : IRoom} = {};

db['1'] = { id: '1', name: 'living room'};
db['2'] = { id: '2', name: 'bathroom'};

@Injectable()
export class RoomRepository {
  async getRoomAsync(id: string): Promise<IRoom> {
    return db[id];
  }

  async existsAsync(id: string): Promise<boolean> {
    return db[id] !== undefined;
  }

  async createRoomAsync(room: IRoom): Promise<IRoom> {
    db[room.id]=room;
    return room;
  }

  async updateRoomAsync(room: IRoom): Promise<IRoom> {
    db[room.id]=room;
    return room;
  }

  async deleteRoomAsync(id: string): Promise<any> {
    delete db[id];
  }
}