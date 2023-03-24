import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RandomNounsTrainingDialogData } from 'src/app/models';

@Component({
    template: `
        <h2 mat-dialog-title>Random nouns training</h2>
        <mat-dialog-content>
            <random-nouns-training
                [randomNounsTraining]="dialogData.randomNounsTraining"
            ></random-nouns-training>
        </mat-dialog-content>
        <mat-dialog-actions align="end">
            <button mat-button [mat-dialog-close]="true" cdkFocusInitial>
                Close
            </button>
        </mat-dialog-actions>
    `,
    styles: [``],
})
export class RandomNounsTrainingDialogComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA)
        public dialogData: RandomNounsTrainingDialogData
    ) {}
}
