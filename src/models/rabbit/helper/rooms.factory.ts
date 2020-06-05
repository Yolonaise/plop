import { IRoom } from "../../room.model.ts";
import { RoomMessage } from "../rooms.message.ts";

export function createRoomCreated(room: IRoom): RoomMessage {
  var res = new RoomMessage();

  res.value = {
    roomCreated: { room: room },
  };

  return res;
}

export function createRoomUpdated(room: IRoom): RoomMessage {
  var res = new RoomMessage();

  res.value = {
    roomUpdated: { room: room },
  };

  return res;
}

export function createRoomDeleted(ref: string): RoomMessage {
  var res = new RoomMessage();

  res.value = {
    roomDeleted: { ref: ref },
  };

  return res;
}
