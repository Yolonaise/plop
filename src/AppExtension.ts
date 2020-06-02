import ApplicationBuilder from "./builders/application.builder.ts";
import { HomeArea } from "./controllers/areas/home.area.ts";
import { RoomArea } from "./controllers/areas/room.area.ts";


export function addControllers (builder: ApplicationBuilder) {
  builder
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
