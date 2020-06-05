import {
  Injectable,
  MongoClient,
  Database,
  Collection,
  InternalServerError,
} from "../../deps.ts";
import { dbConfig } from "../configurations/configuration.ts";

let mainClient: MongoClient;
let maintDatabase: Database;
let rooms: Collection;

@Injectable()
export default class PlopContext {
  constructor() {
  }

  async init(): Promise<any> {
    // connection time
    const client = new MongoClient();
    client.connectWithUri(`mongodb://diplo:${dbConfig.port}`);
    mainClient = client;
    // Instanciate Database.
    maintDatabase = mainClient.database(`${dbConfig.database}`);
    // Get tables and other stuffs
    rooms = maintDatabase.collection(`Rooms`);
  }

  rooms() {
    return rooms;
  }

  async reqRooms(func: (c: Collection) => Promise<any>): Promise<any> {
    try {
      return await func(this.rooms())
    } catch(err) {
      console.log({err});
      throw new InternalServerError("diplo has failed");
    }
  }
}
