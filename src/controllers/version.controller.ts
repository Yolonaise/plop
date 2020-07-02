import { Controller, Get } from "../../deps.ts";

@Controller("/")
export class versionController {
  @Get("status")
  text() {
    return { status: "online" };
  }
}
