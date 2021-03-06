import { Injectable, BadRequestError, IHome } from "../../../deps.ts";
import { IValidator } from "./validator.interface.ts";

@Injectable()
export class HomeValidator implements IValidator<IHome> {
  onCreate(model: IHome): void {
    if (!model) {
      throw new BadRequestError("Request is not correct");
    }
    if (!model.name || model.name == "") {
      throw new BadRequestError("Must have a name");
    }
  }

  onUpdate(model: IHome): void {
    if (!model) {
      throw new BadRequestError("Request is not correct");
    }
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
