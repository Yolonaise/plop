import { ApplicationBuilder } from "./builders/application.builder.ts";
import { HomeArea } from "./controllers/areas/home.area.ts";
import { RoomArea } from "./controllers/areas/room.area.ts";

declare module "./builders/application.builder.ts" {
  interface ApplicationBuilder {
    addControllers(): ApplicationBuilder;
  }
}
  

ApplicationBuilder.prototype.addControllers = function (): ApplicationBuilder {
  return this
    .userCors((c) =>
      c.AllowAnyOrigin()
       .AllowAnyMethod()
       .AllowAnyHeader()
    )
    .useSettings((s) =>
      s.addArea(() => HomeArea)
        .addArea(() => RoomArea)
        .withLogging(false)
    );
}
