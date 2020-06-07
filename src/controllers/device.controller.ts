import { 
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete
} from '../../deps.ts';
import { DeviceService } from '../services/device.service.ts';
import { IDevice } from '../models/device.model.ts';

@Controller('/device')
export class DeviceController {

  constructor(private service: DeviceService) { }

  @Get('/')
  async getDevicesAsync() {
      return await this.service.getAllAsync();
  }

  @Get('/:id')
  async getDeviceAsync(@Param('id') id: string) {
      return await this.service.getDeviceAsync(id);
  }

  @Post('/')
  async createDeviceAsync(@Body() body: IDevice) {
      return await this.service.createDeviceAsync(body);
  }

  @Put('/')
  async updateDeviceAsync(@Body() body: IDevice) {
      return await this.service.updateDeviceAsync(body);
  }

  @Delete('/:id')
  async deleteDeviceAsync(@Param('id') id: string) {
      return await this.service.deleteDeviceAsync(id);
  }
}
