import { apiConfig } from "./configurations/configuration.ts";
import { defaultBuilder } from "./builders/database.builder.ts";
import ApplicationBuilder from "./builders/application.builder.ts";
import { addControllers } from "./AppExtension.ts";

export async function main(_: string[] = []): Promise<void> {
  // Titling the application
  console.log(
    " ____  __    _____  ____ \n" +
      "(  _ \\(  )  (  _  )(  _ \\\n" +
      " )___\/ )(__  )(_)(  )___/\n" +
      "(__)  (____)(_____)(__)  \n",
  );

  //Creating the app
  const builder = new ApplicationBuilder();
  addControllers(builder);

  // Config the database
  defaultBuilder.init();
  console.log(`**** Diplo is here ****`);
  
  builder.build().listen(`${apiConfig.hostname}:${apiConfig.port}`);

  // nothing interresting here
  console.log(`******* Plopping ******`);
}

export default main;
