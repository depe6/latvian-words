import {
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
} from '@angular/core';
import { Verb, VerbMood, VerbMoodType } from 'src/app/models';

@Component({
    selector: 'verb-form',
    template: `
        <mat-form-field class="input">
            <mat-label>Latvian Infinitive</mat-label>
            <input [(ngModel)]="verb.latvianInfinitive" matInput />
        </mat-form-field>
        <mat-form-field class="input">
            <mat-label>Russian Infinitive</mat-label>
            <input [(ngModel)]="verb.russianInfinitive" matInput />
        </mat-form-field>

        <mat-form-field appearance="fill" class="input">
            <mat-label>Verb Mood</mat-label>
            <mat-select
                [(ngModel)]="selectedMoodType"
                (selectionChange)="onVerbMoodSelectionChanged()"
            >
                <mat-option *ngFor="let mood of moodTypes" [value]="mood">
                    {{ mood }}
                </mat-option>
            </mat-select>
        </mat-form-field>

        <verb-mood [mood]="selectedMood"></verb-mood>
    `,
    styles: [
        `
            .input {
                width: 100%;
            }
        `,
    ],
})
export class VerbFormComponent implements OnInit, OnChanges {
    selectedMoodType = VerbMoodType.Indicative;
    moodTypes = [VerbMoodType.Indicative];
    selectedMood = VerbMood.empty();

    @Input()
    verb: Verb = Verb.empty();

    ngOnInit() {
        this.refreshSelectedMood();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.refreshSelectedMood();
    }

    onVerbMoodSelectionChanged() {
        this.refreshSelectedMood();
    }

    refreshSelectedMood() {
        if (!this.verb) {
            return;
        }
        switch (this.selectedMoodType) {
            case VerbMoodType.Indicative: {
                this.selectedMood = this.verb.indicative;
            }
        }
    }
}
