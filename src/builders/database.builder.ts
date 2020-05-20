import PlopContext from '../repository/plop.context.ts';

class DatabaseBuilder {
  private context: PlopContext;
  
  public constructor() {
    this.context = new PlopContext();
  }
  
  async init(): Promise<any>{
    await this.context.init();
  }
}

export const defaultBuilder = new DatabaseBuilder(); 