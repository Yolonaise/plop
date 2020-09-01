import {
  Injectable,
  MongoClient,
  Database,
  Collection,
  IFloor,
  IRoom,
  IHome,
  IDevice,
} from "../../deps.ts";
import { dbConfig } from "../configurations/configuration.ts";

let mainClient: MongoClient;
let maintDatabase: Database;
let rooms: Collection<IRoom>;
let homes: Collection<IHome>;
let devices: Collection<IDevice>;
let floors: Collection<IFloor>;

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
    console.log(homes);
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
}
