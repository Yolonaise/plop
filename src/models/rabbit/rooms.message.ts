import { IMessage } from "../../../deps.ts";
import { IRoom } from "../room.model.ts";

type IRoomValue = {
  roomDeleted?: { ref: string };
  roomCreated?: { room: IRoom };
  roomUpdated?: { room: IRoom };
};

export class RoomMessage implements IMessage {
  value: IRoomValue = {};

  parse(data: Uint8Array): void {
    this.value = JSON.parse(new TextDecoder().decode(data));
  }

  getPayload(): string {
    return JSON.stringify(this.value);
  }

  getName(): string {
    return "Room";
  }
}
