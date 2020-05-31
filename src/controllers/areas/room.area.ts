import { Area } from "../../../deps.ts";
import { RoomController } from "../room.controller.ts";

@Area({
  controllers: [RoomController],
})
export class RoomArea {}
