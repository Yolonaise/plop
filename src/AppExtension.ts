import ApplicationBuilder from "./builders/application.builder.ts";
import { HomeArea } from "./controllers/areas/home.area.ts";
import { RoomArea } from "./controllers/areas/room.area.ts";
import { LogMiddleware } from "./middlewares/log.middleware.ts";
import { HttpError, Content } from "../deps.ts";
import { DeviceArea } from "./controllers/areas/device.area.ts";

export function addControllers(builder: ApplicationBuilder) {
  builder
    .userCors((c) =>
      c.AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader()
    )
    .useSettings((s) =>
      s
        .addArea(() => HomeArea)
        .addArea(() => RoomArea)
        .addArea(() => DeviceArea)
        .addMiddleware(() => LogMiddleware)
        .withLogging(false)
    )
    .useError((c, err) => {
      c.response.result = Content(
        { reason: (err as HttpError).message || "Server has process an error, please try later" },
        (err as HttpError).httpCode || 500,
      );
      c.response.setImmediately();
    });
}
