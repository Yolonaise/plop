import { apiConfig } from "./configurations/configuration.ts";
import "./startup.ts";
import { defaultBuilder } from "./builders/database.builder.ts";
import ApplicationBuilder from "./builders/application.builder.ts";

export async function main(_: string[] = []): Promise<void> {
  // Titling the application
  console.log(
    " ____  __    _____  ____ \n" +
      "(  _ \\(  )  (  _  )(  _ \\\n" +
      " )___\/ )(__  )(_)(  )___/\n" +
      "(__)  (____)(_____)(__)  \n",
  );

  //Creating the app
  const app = new ApplicationBuilder();

  // Config the database
  defaultBuilder.init();
  console.log(`**** Diplo is here ****`);
  
 

  // nothing interresting here
  console.log(`******* Plopping ******`);
}

export default main;
