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
let homes: Collection;
let devices: Collection;
let floors: Collection;

@Injectable()
export default class PlopContext {
  constructor() {
  }

  async init(): Promise<any> {
    const client = new MongoClient();
    client.connectWithUri(`mongodb://diplo:${dbConfig.port}`);
    mainClient = client;

    maintDatabase = mainClient.database(`${dbConfig.database}`);

    homes = maintDatabase.collection("Homes");
    rooms = maintDatabase.collection("Rooms");
    devices = maintDatabase.collection("Devices");
    floors = maintDatabase.collection("Floors");
  }

  rooms() {
    return rooms;
  }

  devices() {
    return devices;
  }

  homes() {
    return homes;
  }

  floors() {
    return floors;
  }

  async sendRequestAsync(
    collection: Collection,
    func: (c: Collection) => Promise<any>,
  ): Promise<any> {
    try {
      if (!collection) {
        throw new InternalServerError("no collection provided");
      }
      return await func(collection);
    } catch (err) {
      console.log({ err });
      throw new InternalServerError("diplo has failed");
    }
  }
}
