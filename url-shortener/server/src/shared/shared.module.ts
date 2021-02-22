import { Module } from '@nestjs/common';
import { UrlService } from './service/url/url.service';
import { DbService } from './service/db/db.service';

@Module({
    providers: [UrlService, DbService],
    exports: [UrlService, DbService],
})
export class SharedModule {}
