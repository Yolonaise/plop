import { Injectable, Inject, IHome } from "../../deps.ts";
import PlopContext from "./plop.context.ts";

@Injectable()
export class HomeRepository {
  constructor(@Inject(PlopContext) private context: PlopContext) {}

  async getAllAsync(): Promise<IHome[]> {
    return await this.context.sendRequestAsync(
      this.context.homes(),
      (c) => c.find(),
    );
  }

  async getFilteredAsync(filter: object): Promise<IHome[]> {
    return await this.context.sendRequestAsync(
      this.context.homes(),
      (c) => c.find(filter),
    );
  }

  async getHomeAsync(id: string): Promise<IHome> {
    return await this.context.sendRequestAsync(
      this.context.homes(),
      (c) => c.findOne({ _id: { $oid: id } }),
    );
  }

  async existsAsync(id: string): Promise<boolean> {
    const res = await this.context.sendRequestAsync(
      this.context.homes(),
      (c) => c.findOne({ _id: { $oid: id } }),
    );
    return res != undefined;
  }

  async createHomeAsync(home: IHome): Promise<IHome> {
    delete home._id;
    const id = await this.context.sendRequestAsync(
      this.context.homes(),
      (c) => c.insertOne(home),
    );
    return { ...home, _id: id };
  }

  async updateHomeAsync(home: IHome): Promise<IHome> {
    await this.context.sendRequestAsync(
      this.context.homes(),
      (c) => c.updateOne({ _id: home._id }, home),
    );
    return { ...home };
  }

  async deleteHomeAsync(id: string): Promise<any> {
    await this.context.sendRequestAsync(
      this.context.homes(),
      (c) => c.deleteOne({ _id: { $oid: id } }),
    );
  }
}
