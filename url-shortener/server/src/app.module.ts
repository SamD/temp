import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { UrlShortenerController } from './url-shortener/url-shortener.controller';

@Module({
    imports: [SharedModule],
    controllers: [UrlShortenerController],
    providers: [AppService],
})
export class AppModule {}
