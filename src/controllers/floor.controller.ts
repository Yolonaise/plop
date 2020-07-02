import { 
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  IFloor
} from '../../deps.ts';
import { FloorService } from '../services/floor.service.ts';

@Controller('/floor')
export class FloorController {

  constructor(private service: FloorService) { }

  @Get('/')
  async getFloorsAsync() {
      return await this.service.getAllAsync();
  }

  @Get('/:id')
  async getFloorAsync(@Param('id') id: string) {
      return await this.service.getFloorAsync(id);
  }

  @Post('/')
  async createFloorAsync(@Body() body: IFloor) {
      return await this.service.createFloorAsync(body);
  }

  @Put('/')
  async updateFloorAsync(@Body() body: IFloor) {
      return await this.service.updateFloorAsync(body);
  }

  @Delete('/:id')
  async deleteFloorAsync(@Param('id') id: string) {
      return await this.service.deleteFloorAsync(id);
  }
}
