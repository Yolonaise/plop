import { IMessage } from "../../../deps.ts";
import { IDevice } from "../device.model.ts";

type IDeviceValue = {
  deviceDeleted?: { ref: string };
  deviceCreated?: { device: IDevice };
  deviceUpdated?: { device: IDevice };
};

export class DeviceMessage implements IMessage {
  value: IDeviceValue = {};

  parse(data: Uint8Array): void {
    this.value = JSON.parse(new TextDecoder().decode(data));
  }

  getPayload(): string {
    return JSON.stringify(this.value);
  }

  getName(): string {
    return "Device";
  }
}
