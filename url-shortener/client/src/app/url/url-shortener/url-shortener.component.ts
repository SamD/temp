import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {UrlService} from '../url.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogDataComponent} from '../dialog-data/dialog-data.component';

@Component({
    selector: 'app-url-shortener',
    templateUrl: './url-shortener.component.html',
    styleUrls: ['./url-shortener.component.scss']
})
export class UrlShortenerComponent implements OnInit {
    readonly httpRegex = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    url: FormControl;
    shortUrl: FormControl;

    constructor(private readonly urlService: UrlService, private dialog: MatDialog) {
        this.url = new FormControl('', [Validators.required, Validators.pattern(this.httpRegex)]);
        this.shortUrl = new FormControl('', [Validators.required, Validators.pattern(this.httpRegex)]);
    }

    ngOnInit(): void {
    }

    getErrorMessage(): string {
        if (this.url.hasError('required')) {
            return 'You must enter a value';
        }
        return this.url.hasError('pattern') ? 'Not a valid url' : '';
    }

    shorten(): void {
        this.urlService.getShortUrl(this.url.value).subscribe(
            res => {
                console.log('HTTP Success Response', res);
                this.shortUrl.patchValue(res.url);
            },
            err => {
                console.error('HTTP Error', err);
                this.launchDialog({
                    header: 'HTTP Request Error',
                    content: err.message
                });
            },
            () => console.log('HTTP request completed.')
        );
    }

    launchDialog(data: any): void {
        this.dialog.open(DialogDataComponent, {
            data: {
                ...data
            }
        });
    }
}
