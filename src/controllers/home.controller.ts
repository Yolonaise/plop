import { Controller, Get } from '../../deps.ts';

@Controller('/')
export class HomeController {
    @Get('status')
    text() {
        return 'Hello world!';
    }
}
