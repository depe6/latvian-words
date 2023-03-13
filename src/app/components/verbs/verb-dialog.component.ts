import { Dialog } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Verb, VerbDialogData } from 'src/app/models';
import { DialogService } from 'src/app/services/dialog/dialog.service';

@Component({
    selector: 'verbs',
    template: `
        <h2 mat-dialog-title>Verb</h2>
        <mat-dialog-content>
            <verb-form [verb]="dialogData.verb"></verb-form>
        </mat-dialog-content>
        <mat-dialog-actions align="end">
            <button mat-button (click)="onSave()">Save</button>
            <button mat-button [mat-dialog-close]="false" cdkFocusInitial>
                Cancel
            </button>
        </mat-dialog-actions>
    `,
    styles: [``],
})
export class VerbDialogComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public dialogData: VerbDialogData,
        private dialogRef: MatDialogRef<boolean>,
        private dialogService: DialogService
    ) {}

    onSave() {
        if (
            this.dialogData.allVerbs.some(
                (x) =>
                    (x.latvianInfinitive || '').toLowerCase() ===
                        (
                            this.dialogData.verb.latvianInfinitive || ''
                        ).toLowerCase() ||
                    (x.russianInfinitive || '').toLowerCase() ===
                        (
                            this.dialogData.verb.russianInfinitive || ''
                        ).toLowerCase()
            )
        ) {
            this.dialogService.showMessageDialog(
                'Warning',
                `Verb ${this.dialogData.verb.latvianInfinitive} (${this.dialogData.verb.russianInfinitive}) already exists`
            );
            return;
        }
        this.dialogRef.close(true);
    }
}
