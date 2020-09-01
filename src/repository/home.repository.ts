import { Injectable, Inject, IHome, ObjectId } from "../../deps.ts";
import PlopContext from "./plop.context.ts";

@Injectable()
export class HomeRepository {
  
  constructor(@Inject(PlopContext) private context: PlopContext) {}

  async getAllAsync(): Promise<IHome[]> {
    return await this.context.homes().find();
  }

  async getFilteredAsync(filter: object): Promise<IHome[]> {
    return await this.context.homes().find(filter);
  }

  async getHomeAsync(id: string): Promise<IHome | null> {
    return await this.context.homes().findOne({ _id: ObjectId(id) });
  }

  async existsAsync(id: string): Promise<boolean> {
    return await this.getHomeAsync(id) != undefined;
  }

  async createHomeAsync(home: IHome): Promise<IHome> {
    const id = await this.context.homes().insertOne(home)
    return { ...home, _id: id };
  }

  async updateHomeAsync(home: IHome): Promise<IHome> {
    return await this.context.homes().updateOne({ _id: home._id }, home);
  }

  async deleteHomeAsync(id: string): Promise<any> {
    await this.context.homes().deleteOne({ _id: ObjectId(id)});
  }
}
