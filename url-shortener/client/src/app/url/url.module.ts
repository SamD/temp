import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {UrlShortenerComponent} from './url-shortener/url-shortener.component';
import {UrlRoutingModule} from './url-routing.module';
import { UrlNavigationComponent } from './url-navigation/url-navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogDataComponent } from './dialog-data/dialog-data.component';


@NgModule({
    declarations: [UrlShortenerComponent, UrlNavigationComponent, DialogDataComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        UrlRoutingModule,
        LayoutModule,
        MatFormFieldModule,
        MatToolbarModule,
        MatButtonModule,
        MatDialogModule,
        MatSidenavModule,
        MatIconModule,
        MatInputModule,
        MatListModule
    ],
    exports: [],
    providers: [
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    ]
})
export class UrlModule {
}
