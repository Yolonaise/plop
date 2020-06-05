import { Injectable, BadRequestError } from "../../../deps.ts";
import { IValidator } from "./validator.interface.ts";
import { IRoom } from "../../models/room.model.ts";

@Injectable()
export class RoomValidator implements IValidator<IRoom> {
  onCreate(model: IRoom): void {
    if (!model.name || model.name == "") {
      throw new BadRequestError("Must have a name");
    }
  }

  onUpdate(model: IRoom): void {
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
