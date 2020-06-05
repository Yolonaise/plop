import { App, CorsBuilder, Context } from "../../deps.ts";
import AppSettingsBuilder from "./appSettings.builder.ts";

type AppSettingBuilderHandler = (a: AppSettingsBuilder) => AppSettingsBuilder;
type CorsBuilderHandler = (c: CorsBuilder<unknown>) => CorsBuilder<unknown>;
type ErrorHandler = (context: Context<any>, error: Error) => void;

export default class ApplicationBuilder {
  appSettingsBuilderHandler?: AppSettingBuilderHandler;
  corsBuilderHandler?: CorsBuilderHandler;
  errorHandler?: ErrorHandler;

  constructor() {
  }

  useSettings(builder: AppSettingBuilderHandler): ApplicationBuilder {
    this.appSettingsBuilderHandler = builder;
    return this;
  }

  userCors(builder: CorsBuilderHandler): ApplicationBuilder {
    this.corsBuilderHandler = builder;
    return this;
  }

  useError(handler: ErrorHandler) {
    this.errorHandler = handler;
  }

  build(): App<unknown> {
    const result = new App(
      this.appSettingsBuilderHandler!(new AppSettingsBuilder()).build(),
    );

    if (this.corsBuilderHandler) {
      result.useCors(this.corsBuilderHandler(new CorsBuilder()));
    }

    if (this.errorHandler) {
      result.error(this.errorHandler);
    }

    return result;
  }
}
