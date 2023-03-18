import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NounDialogData } from 'src/app/models';
import { DialogService } from 'src/app/services/dialog/dialog.service';

@Component({
    template: `
        <h2 mat-dialog-title>Noun</h2>
        <mat-dialog-content>
            <noun-form [noun]="dialogData.noun"></noun-form>
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
export class NounDialogComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public dialogData: NounDialogData,
        private dialogRef: MatDialogRef<boolean>,
        private dialogService: DialogService
    ) {}

    onSave() {
        if (
            this.dialogData.addingNewNoun &&
            this.dialogData.allNouns.some(
                (x) =>
                    (x.latvian || '').toLowerCase() ===
                        (this.dialogData.noun.latvian || '').toLowerCase() ||
                    (x.russian || '').toLowerCase() ===
                        (this.dialogData.noun.russian || '').toLowerCase()
            )
        ) {
            this.dialogService.showMessageDialog(
                'Warning',
                `Noun ${this.dialogData.noun.latvian} (${this.dialogData.noun.russian}) already exists`
            );
            return;
        }
        this.dialogRef.close(true);
    }
}
