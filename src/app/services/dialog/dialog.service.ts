import { Injectable } from '@angular/core';
import { DialogButton, MessageDialogData } from 'src/app/models';
import { MessageDialogComponent } from 'src/app/components';
import { MatDialog } from '@angular/material/dialog';

@Injectable({ providedIn: 'root' })
export class DialogService {
    constructor(private dialog: MatDialog) {}

    showMessageDialog(
        title: string,
        text: string,
        buttons: DialogButton[] = [{ text: 'OK', data: 'ok' }]
    ) {
        const dialogRef = this.dialog.open(MessageDialogComponent, {
            maxWidth: '600px',
            data: { title, text, buttons } as MessageDialogData,
        });

        return dialogRef;
    }
}
