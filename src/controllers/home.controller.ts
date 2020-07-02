import { 
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  IHome
} from '../../deps.ts';
import { HomeService } from '../services/home.service.ts';

@Controller('/home')
export class HomeController {

  constructor(private service: HomeService) { }

  @Get('/')
  async getHomesAsync() {
      return await this.service.getAllAsync();
  }

  @Get('/:id')
  async getHomeAsync(@Param('id') id: string) {
      return await this.service.getHomeAsync(id);
  }

  @Post('/')
  async createHomeAsync(@Body() body: IHome) {
      return await this.service.createHomeAsync(body);
  }

  @Put('/')
  async updateHomeAsync(@Body() body: IHome) {
      return await this.service.updateHomeAsync(body);
  }

  @Delete('/:id')
  async deleteHomeAsync(@Param('id') id: string) {
      return await this.service.deleteHomeAsync(id);
  }
}
