import { Injectable } from '@nestjs/common';
import { MersenneTwister19937, string } from 'random-js';

@Injectable()
export class UrlService {
    public static readonly CHAR_POOL = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    public static SHORT_URL_VAR_LENGTH = 6;
    private engine: MersenneTwister19937 = MersenneTwister19937.autoSeed();

    public getShortened(inputString: string): string {
        return string(UrlService.CHAR_POOL)(this.engine, UrlService.SHORT_URL_VAR_LENGTH);
    }
}
