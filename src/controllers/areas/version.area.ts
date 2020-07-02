import { Area } from "../../../deps.ts";
import { versionController } from "../version.controller.ts";

@Area({
  controllers: [versionController],
})
export class VersionArea {}
