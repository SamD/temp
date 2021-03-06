import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
    selector: 'app-dialog-data',
    templateUrl: './dialog-data.component.html',
    styleUrls: ['./dialog-data.component.scss']
})
export class DialogDataComponent {

    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
        console.log(`DATA: ${data}`);
    }

}
