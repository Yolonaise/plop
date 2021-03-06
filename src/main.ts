import { apiConfig, dbConfig } from "./configurations/configuration.ts";
import { PlopBuilder, Content, HttpError } from "../deps.ts";
import { RoomArea } from "./controllers/areas/room.area.ts";
import { DeviceArea } from "./controllers/areas/device.area.ts";
import { LogMiddleware } from "./middlewares/log.middleware.ts";
import PlopContext from "./repository/plop.context.ts";
import { VersionArea } from "./controllers/areas/version.area.ts";
import { HomeArea } from "./controllers/areas/home.area.ts";
import { FloorArea } from "./controllers/areas/floor.area.ts";

export async function main(_: string[] = []): Promise<void> {
  console.log(
    " ____  __    _____  ____ \n" +
      "(  _ \\(  )  (  _  )(  _ \\\n" +
      " )___\/ )(__  )(_)(  )___/\n" +
      "(__)  (____)(_____)(__)  \n",
  );

  new PlopBuilder()
    .withPlopConfig(apiConfig)
    .withApp(
      (a) =>
        a.userCors(
          (c) =>
            c.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader(),
        )
          .useSettings(
            (s) =>
              s.addArea(() => VersionArea)
                .addArea(() => HomeArea)
                .addArea(() => RoomArea)
                .addArea(() => DeviceArea)
                .addArea(() => FloorArea)
                .addMiddleware(() => LogMiddleware)
                .withLogging(false),
          )
          .useError(
            (c, err) => {
              c.response.result = Content(
                {
                  reason: (err as HttpError).message ||
                    "Server meets an error, please try later",
                },
                (err as HttpError).httpCode || 500,
              );
              c.response.setImmediately();
            },
          ),
    )
    .withDatabase(
      (d) =>
        d.withType(PlopContext)
          .withConfig(dbConfig),
    )
    .build();

  console.log(`******* Plopping ******`);
}

export default main;
