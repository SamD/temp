import { Body, Controller, Get, HttpStatus, Param, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { DbService } from '../shared/service/db/db.service';
import { UrlService } from '../shared/service/url/url.service';
import * as validUrl from 'valid-url';

@Controller('s')
export class UrlShortenerController {
    constructor(private readonly db: DbService, private readonly urlService: UrlService) {}

    @Get(':id')
    get(@Param('id') id: string, @Res() response: Response): void {
        console.log(`Doing lookup for ${id}`);
        const reverseShortUrlLookup = this.db.get(id);
        if (!reverseShortUrlLookup) {
            console.error(`No matching url found for ${id}`);
            response.status(HttpStatus.NOT_FOUND).json({
                errorMsg: `No matching url found for ${id}`,
            });
            return;
        }
        console.log(`Found match for ${id}, url ${reverseShortUrlLookup}`);
        /*response.status(HttpStatus.OK).json({
            url: reverseShortUrlLookup,
        });
        */
        response.redirect(reverseShortUrlLookup);
    }

    @Post()
    create(@Req() request: Request, @Res() response: Response, @Body('url') url: string): void {
        if (!validUrl.isWebUri(url)) {
            response.status(HttpStatus.BAD_REQUEST).json({
                errorMsg: `Invalid input URL: ${url}`,
            });
            return;
        }

        // if there was a match found in the db return
        const dbResult: string = this.db.get(url);
        if (dbResult) {
            console.log(`Cache hit for for url: ${url}, value: ${dbResult}`);
            response.status(HttpStatus.CREATED).json({
                url: dbResult,
            });
            return;
        }

        console.log(`Cache miss for for url ${url}`);
        // no match
        // create
        const shortenedUrl = this.urlService.getShortened(url);
        console.debug(`Shortened ${url} to ${shortenedUrl}`);

        const { protocol, hostname, path } = request;
        const fullShortUrl = `${protocol}://${hostname}:8080${path}/${shortenedUrl}`;

        // for the time store both the shortened url and the url as key
        const writeResult = this.db.mset([
            {
                key: shortenedUrl,
                val: url,
            },
            // store the url an the fully generated url in the case the same dupe request comes again
            {
                key: url,
                val: fullShortUrl,
            },
        ]);
        if (!writeResult) {
            console.error(`Something went wrong on writing to cache for key: ${shortenedUrl}, value: ${url}`);
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                errorMsg: `Error persisting ${url}`,
            });
            return;
        }
        console.debug(`Persisted key: ${shortenedUrl}, value: ${url}`);

        response.status(HttpStatus.CREATED).json({
            url: fullShortUrl,
        });
    }
}
