import { IDevice } from "../../device.model.ts";
import { DeviceMessage } from "../device.message.ts";

export function createDeviceCreated(Device: IDevice): DeviceMessage {
  var res = new DeviceMessage();

  res.value = {
    deviceCreated: { device: Device },
  };

  return res;
}

export function createDeviceUpdated(Device: IDevice): DeviceMessage {
  var res = new DeviceMessage();

  res.value = {
    deviceUpdated: { device: Device },
  };

  return res;
}

export function createDeviceDeleted(ref: string): DeviceMessage {
  var res = new DeviceMessage();

  res.value = {
    deviceDeleted: { ref: ref },
  };

  return res;
}
