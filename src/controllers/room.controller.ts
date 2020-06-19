import { 
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  IRoom
} from '../../deps.ts';
import { RoomService } from '../services/room.service.ts';

@Controller('/room')
export class RoomController {

  constructor(private service: RoomService) { }

  @Get('/')
  async getRoomsAsync() {
      return await this.service.getAllAsync();
  }

  @Get('/:id')
  async getRoomAsync(@Param('id') id: string) {
      return await this.service.getRoomAsync(id);
  }

  @Post('/')
  async createRoomAsync(@Body() body: IRoom) {
      return await this.service.createRoomAsync(body);
  }

  @Put('/')
  async updateRoomAsync(@Body() body: IRoom) {
      return await this.service.updateRoomAsync(body);
  }

  @Delete('/:id')
  async deleteRoomAsync(@Param('id') id: string) {
      return await this.service.deleteRoomAsync(id);
  }
}
