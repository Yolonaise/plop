import { App } from '../deps.ts';
import { HomeArea } from './controllers/areas/home.area.ts';
import { RoomArea } from './controllers/areas/room.area.ts';
import ApplicationBuilder from './builders/application.builder.ts';

export default function configureServer(): App {  
  return new ApplicationBuilder()
    .userCors(c => c
      .AllowAnyOrigin()
      .AllowAnyMethod()
      .AllowAnyHeader())
    .useSettings(s => s
      .addArea(() => HomeArea)
      .addArea(() => RoomArea)
      .withLogging(false))
    .build();
}