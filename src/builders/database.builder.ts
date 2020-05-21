import PlopContext from '../repository/plop.context.ts';

class DatabaseBuilder {
  private context: PlopContext;
  
  public constructor() {
    this.context = new PlopContext();
  }
  
  init(): void {
    this.context.init();
  }
}

export const defaultBuilder = new DatabaseBuilder(); 