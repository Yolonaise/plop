import { AppSettings } from "https://deno.land/x/alosaur/src/mod.ts";

export default class AppSettingsBuilder {
  private settings: AppSettings;

  constructor() {
    this.settings = { areas: [] } as AppSettings;
  }

  addArea(area: ()=>{}): AppSettingsBuilder {
    this.settings.areas.push(area);
    return this;
  }

  withLogging(value: boolean): AppSettingsBuilder {
    this.settings.logging = value;
    return this;
  }

  build(): AppSettings {
    return this.settings;
  }
}