import { Controller, Get } from 'https://deno.land/x/alosaur/src/mod.ts';

@Controller('/')
export class HomeController {
    @Get('status')
    text() {
        return 'Hello world!';
    }
}
