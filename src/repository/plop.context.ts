import { Database } from '../../deps.ts';
import { Injectable } from '../../deps.ts';
import { dbConfig } from '../configurations/configuration.ts';
import { Room } from './models/rooms.model.ts';

@Injectable()
export default class PlopContext {
  private readonly db: Database;

  constructor() {
    this.db = new Database('postgres', {
      host: 'diplo',
      username: dbConfig.user,
      password:  dbConfig.password,
      database: dbConfig.database,
    });
  }

  async init():Promise<any> {
    this.db.link([Room]);
    this.db.sync({drop:true});
  }
}