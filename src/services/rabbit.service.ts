import {
  Singleton,
  RabbitFactory,
  TopicProducer,
  Producer,
  RoomMessage,
  DeviceMessage,
  HomeMessage,
  FloorMessage,
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

  async getHomeProducerAsync(): Promise<Producer<HomeMessage>> {
    return await this.factory.getProducer(TopicProducer, HomeMessage);
  }

  
  async getFloorProducerAsync(): Promise<Producer<FloorMessage>> {
    return await this.factory.getProducer(TopicProducer, FloorMessage);
  }
}
