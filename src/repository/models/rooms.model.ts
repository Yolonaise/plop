import { DATA_TYPES, Model } from '../../../deps.ts';

export class Room extends Model {
  static table = 'room';

  static fields = {
    id: {
      primaryKey: true,
      autoIncrement: true,
    },
    name: DATA_TYPES.STRING,
  };
}