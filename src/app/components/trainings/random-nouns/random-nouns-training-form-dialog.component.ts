import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RandomNounsTrainingFormDialogData } from 'src/app/models';

@Component({
    template: `
        <h2 mat-dialog-title>Random nouns training</h2>
        <mat-dialog-content>
            <random-nouns-training-form
                [randomNounsTraining]="dialogData.randomNounsTraining"
            ></random-nouns-training-form>
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
export class RandomNounsTrainingFormDialogComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA)
        public dialogData: RandomNounsTrainingFormDialogData,
        private dialogRef: MatDialogRef<boolean>
    ) {}

    onSave() {
        this.dialogRef.close(true);
    }
}
