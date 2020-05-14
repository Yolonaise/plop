import { App, CorsBuilder } from 'https://deno.land/x/alosaur/src/mod.ts';
import AppSettingsBuilder from './appSettings.builder.ts';

type AppSettingBuilderHandler = (a: AppSettingsBuilder) => AppSettingsBuilder;
type CorsBuilderHandler = (c: CorsBuilder) => CorsBuilder;

export default class ApplicationBuilder {
  appSettingsBuilderHandler?: AppSettingBuilderHandler 
  corsBuilderHandler?: CorsBuilderHandler;

  constructor() {
  }

  useSettings(builder: AppSettingBuilderHandler): ApplicationBuilder {
    this.appSettingsBuilderHandler = builder;
    return this;
  }

  userCors(builder: CorsBuilderHandler):  ApplicationBuilder {
    this.corsBuilderHandler = builder;
    return this;
  }

  build() : App {
    const result = new App(this.appSettingsBuilderHandler!(new AppSettingsBuilder()).build());
    
    if(this.corsBuilderHandler)
      result.useCors(this.corsBuilderHandler(new CorsBuilder));

    return result;
  }
}