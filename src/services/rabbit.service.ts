import {
  Singleton,
  RabbitFactory,
  TopicProducer,
  Producer,
} from "../../deps.ts";
import { rabbitConfig } from "../configurations/configuration.ts";
import { RoomMessage } from "../models/rabbit/rooms.message.ts";
import { DeviceMessage } from "../models/rabbit/device.message.ts";

@Singleton()
export class Rabbit {
  private factory: RabbitFactory;

  constructor() {
    this.factory = new RabbitFactory(rabbitConfig);
  }

  async getRoomProducerAsync(): Promise<Producer<RoomMessage>> {
    return await this.factory.getProducer(TopicProducer, RoomMessage);
  }

  async getDeviceProducerAsync(): Promise<Producer<DeviceMessage>> {
    return await this.factory.getProducer(TopicProducer, DeviceMessage);
  }
}
