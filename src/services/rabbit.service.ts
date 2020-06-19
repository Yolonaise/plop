import {
  Singleton,
  RabbitFactory,
  TopicProducer,
  Producer,
  RoomMessage,
  DeviceMessage,
} from "../../deps.ts";
import { rabbitConfig } from "../configurations/configuration.ts";

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
