import { Area } from "../../../deps.ts";
import { FloorController } from "../floor.controller.ts";

@Area({
  controllers: [FloorController],
})
export class FloorArea {}
