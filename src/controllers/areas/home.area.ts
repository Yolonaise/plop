import { Area } from '../../../deps.ts'
import { HomeController } from '../home.controller.ts'

@Area({
  controllers: [HomeController],
})
export class HomeArea {}
