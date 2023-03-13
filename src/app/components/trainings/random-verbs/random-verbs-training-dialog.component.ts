import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RandomVerbsTrainingDialogData } from 'src/app/models';

@Component({
    template: `
        <h2 mat-dialog-title>Random verbs training</h2>
        <mat-dialog-content>
            <random-verbs-training
                [randomVerbsTraining]="dialogData.randomVerbsTraining"
            ></random-verbs-training>
        </mat-dialog-content>
        <mat-dialog-actions align="end">
            <button mat-button [mat-dialog-close]="true" cdkFocusInitial>
                Close
            </button>
        </mat-dialog-actions>
    `,
    styles: [``],
})
export class RandomVerbsTrainingDialogComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA)
        public dialogData: RandomVerbsTrainingDialogData,
        private dialogRef: MatDialogRef<boolean>
    ) {}
}
