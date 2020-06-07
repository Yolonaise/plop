import { Injectable, BadRequestError } from "../../../deps.ts";
import { IValidator } from "./validator.interface.ts";
import { IDevice } from "../../models/device.model.ts";

@Injectable()
export class DeviceValidator implements IValidator<IDevice> {
  onCreate(model: IDevice): void {
    if (!model.name || model.name == "") {
      throw new BadRequestError("Must have a name");
    }
  }

  onUpdate(model: IDevice): void {
    if (!model._id || !model._id.$oid || model._id.$oid == "") {
      throw new BadRequestError("Must have an id");
    }
    if (!model.name || model.name == "") {
      throw new BadRequestError("Must have an name");
    }
  }

  onDelete(ref: string): void {
    if (!ref || ref == "") {
      throw new BadRequestError("no ref provided");
    }
  }

  onGet(ref: string): void {
    if (!ref || ref == "") {
      throw new BadRequestError("no ref provided");
    }
  }
}
