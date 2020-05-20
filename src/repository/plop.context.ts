import { Database } from '../../deps.ts';
import { Injectable } from '../../deps.ts';
import { dbConfig } from '../configurations/configuration.ts';

@Injectable()
export default class PlopContext {
  private readonly db: Database;

  constructor() {
    this.db = new Database('postgres', {
      host: 'localhost:58509',
      username: dbConfig.user,
      password:  dbConfig.password,
      database: dbConfig.database,
    });
  }
}