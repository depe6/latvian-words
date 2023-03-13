import { Component, Input } from '@angular/core';
import { RandomVerbsTraining, VerbTenseType } from 'src/app/models';

@Component({
    selector: 'random-verbs-training-form',
    template: `
        <mat-form-field class="input">
            <mat-label>Name</mat-label>
            <input [(ngModel)]="randomVerbsTraining.name" matInput />
        </mat-form-field>
        <mat-form-field class="input">
            <mat-label>Word Count</mat-label>
            <input [(ngModel)]="randomVerbsTraining.wordCount" matInput />
        </mat-form-field>

        <mat-checkbox [(ngModel)]="pastSelected">Past tense</mat-checkbox>
        <mat-checkbox [(ngModel)]="presentSelected">Present tense</mat-checkbox>
        <mat-checkbox [(ngModel)]="futureSelected">Future tense</mat-checkbox>
    `,
    styles: [
        `
            .input {
                width: 100%;
            }
        `,
    ],
})
export class RandomVerbsTrainingFormComponent {
    get pastSelected() {
        return this.getTenseType(VerbTenseType.Past);
    }

    set pastSelected(value: boolean) {
        this.setTenseType(VerbTenseType.Past, value);
    }

    get presentSelected() {
        return this.getTenseType(VerbTenseType.Present);
    }

    set presentSelected(value: boolean) {
        this.setTenseType(VerbTenseType.Present, value);
    }

    get futureSelected() {
        return this.getTenseType(VerbTenseType.Future);
    }

    set futureSelected(value: boolean) {
        this.setTenseType(VerbTenseType.Future, value);
    }

    @Input()
    randomVerbsTraining: RandomVerbsTraining = RandomVerbsTraining.empty();

    private getTenseType(verbTenseType: VerbTenseType) {
        return (this.randomVerbsTraining.verbTenses || []).includes(
            verbTenseType
        );
    }

    private setTenseType(verbTenseType: VerbTenseType, set: boolean) {
        const filteredVerbTypes = (
            this.randomVerbsTraining.verbTenses || []
        ).filter((x) => x !== verbTenseType);

        this.randomVerbsTraining.verbTenses = set
            ? [...filteredVerbTypes, verbTenseType]
            : filteredVerbTypes;
    }
}
