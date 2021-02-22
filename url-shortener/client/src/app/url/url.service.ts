import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UrlService {
    readonly shortenerEndpoint = 'http://localhost:8080/s';

    constructor(private readonly httpClient: HttpClient) {
    }

    getShortUrl(urlToShorten: string): Observable<any> {
        return this.httpClient.post(this.shortenerEndpoint, {
            url: urlToShorten
        });
    }
}
