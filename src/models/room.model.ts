export interface IRoom {
  _id: {
    $oid: string;
  };
  name: string;
  floor: number;
  size: number;
  devices: string[];
}
