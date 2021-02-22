import { Injectable } from '@nestjs/common';
import NodeCache, { ValueSetItem } from 'node-cache';

@Injectable()
export class DbService {
    private nodeCache: NodeCache;

    constructor() {
        // for options see: https://github.com/node-cache/node-cache
        this.nodeCache = new NodeCache({ forceString: true, stdTTL: 0, deleteOnExpire: true });
    }

    public get(key: string): string {
        return this.nodeCache.get(key);
    }

    public set(key: string, value: string): boolean {
        return this.nodeCache.set(key, value);
    }

    public mset(values: ValueSetItem[]): boolean {
        return this.nodeCache.mset(values);
    }
}
