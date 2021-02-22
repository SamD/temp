import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UrlShortenerComponent} from './url-shortener/url-shortener.component';
import {HttpClientModule} from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';

const routes: Routes = [
    {path: '', component: UrlShortenerComponent},
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        HttpClientModule,
        MatIconModule,
    ],
    exports: [RouterModule]
})
export class UrlRoutingModule {
}
