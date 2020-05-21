import configureServer from './startup.ts';
import { apiConfig } from './configurations/configuration.ts';
import { defaultBuilder } from './builders/database.builder.ts';

export async function main (_: string[] = []): Promise<void> {
  // Titling the application
  console.log(
    ' ____  __    _____  ____ \n' +
    '(  _ \\(  )  (  _  )(  _ \\\n' +
    ' )___\/ )(__  )(_)(  )___/\n' +
    '(__)  (____)(_____)(__)  \n'
  );

  // Config the database
  await defaultBuilder.init();
  console.log(`**** Diplo is here ****`);

  // Config the Main plop and launch it
  configureServer()
    .listen(`${apiConfig.hostname}:${apiConfig.port}`);

  // nothing interresting here
  console.log(`******* Plopping ******`);
} 

export default main;