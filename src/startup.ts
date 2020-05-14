import { App, CorsBuilder } from 'https://deno.land/x/alosaur/src/mod.ts';
import { HomeArea } from './controllers/home.area.ts';
import ApplicationBuilder from './builders/application.builder.ts';

export default function configureServer(): App {  
  return new ApplicationBuilder()
    .userCors(c => c
      .AllowAnyOrigin()
      .AllowAnyMethod()
      .AllowAnyHeader())
    .useSettings(s => s
      .addArea(() => HomeArea)
      .withLogging(false))
    .build();
}