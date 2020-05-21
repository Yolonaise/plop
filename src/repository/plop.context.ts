import { 
  Injectable,
  MongoClient, 
  Database,
  Collection,
} from '../../deps.ts';
import { dbConfig } from '../configurations/configuration.ts';

let mainClient: MongoClient;
let maintDatabase: Database;
let rooms: Collection;

@Injectable()
export default class PlopContext {
  
  constructor() {
  }

  async init():Promise<any> {
    // connection time
    const client = new MongoClient();
    client.connectWithUri(`mongodb://diplo:${dbConfig.port}`);
    mainClient = client;
    // Instanciate Database.
    maintDatabase = mainClient.database(`${dbConfig.database}`);
    // Get tables and other stuffs
    rooms = maintDatabase.collection(`Rooms`);
  }

  rooms() { return rooms };
}