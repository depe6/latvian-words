import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogButton, MessageDialogData } from 'src/app/models';

@Component({
    template: `
        <h2 mat-dialog-title>{{ title }}</h2>
        <mat-dialog-content>
            {{ text }}
        </mat-dialog-content>
        <mat-dialog-actions align="end">
            <button
                *ngFor="let button of buttons"
                mat-button
                [mat-dialog-close]="button.data"
            >
                {{ button.text }}
            </button>
        </mat-dialog-actions>
    `,
    styles: [``],
})
export class MessageDialogComponent {
    title = '';
    text = '';
    buttons: DialogButton[] = [];

    constructor(@Inject(MAT_DIALOG_DATA) public dialogData: MessageDialogData) {
        this.title = dialogData?.title || '';
        this.text = dialogData?.text || '';
        this.buttons = dialogData?.buttons || [];
    }
}
