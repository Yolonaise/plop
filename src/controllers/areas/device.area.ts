import { Area } from "../../../deps.ts";
import { DeviceController } from "../device.controller.ts";

@Area({
  controllers: [DeviceController],
})
export class DeviceArea {}
