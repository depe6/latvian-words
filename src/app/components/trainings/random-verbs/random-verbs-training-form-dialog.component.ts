import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RandomVerbsTrainingFormDialogData } from 'src/app/models';

@Component({
    template: `
        <h2 mat-dialog-title>Random verbs training</h2>
        <mat-dialog-content>
            <random-verbs-training-form
                [randomVerbsTraining]="dialogData.randomVerbsTraining"
            ></random-verbs-training-form>
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
export class RandomVerbsTrainingFormDialogComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA)
        public dialogData: RandomVerbsTrainingFormDialogData,
        private dialogRef: MatDialogRef<boolean>
    ) {}

    onSave() {
        this.dialogRef.close(true);
    }
}
