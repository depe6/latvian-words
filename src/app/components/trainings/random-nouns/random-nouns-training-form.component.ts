import { Component, Input } from '@angular/core';
import { RandomNounsTraining } from 'src/app/models';

@Component({
    selector: 'random-nouns-training-form',
    template: `
        <mat-form-field class="input">
            <mat-label>Name</mat-label>
            <input [(ngModel)]="randomNounsTraining.name" matInput />
        </mat-form-field>
        <mat-form-field class="input">
            <mat-label>Word Count</mat-label>
            <input [(ngModel)]="randomNounsTraining.wordCount" matInput />
        </mat-form-field>
    `,
    styles: [
        `
            .input {
                width: 100%;
            }
        `,
    ],
})
export class RandomNounsTrainingFormComponent {
    @Input()
    randomNounsTraining: RandomNounsTraining = RandomNounsTraining.empty();
}
