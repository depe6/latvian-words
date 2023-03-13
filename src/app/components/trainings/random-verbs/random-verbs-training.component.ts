import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RandomVerbsTraining, Verb, VerbTenseType } from 'src/app/models';
import { VerbService } from 'src/app/services';
import { NumberUtils } from 'src/app/utils';

@Component({
    selector: 'random-verbs-training',
    template: `
        <ng-container *ngIf="loading === true">
            <mat-spinner></mat-spinner>
        </ng-container>
        <ng-container *ngIf="!loading && !finished">
            <div class="progress-text">{{ getProgressString() }}</div>
            <mat-progress-bar
                mode="determinate"
                [value]="calculateProgress()"
            ></mat-progress-bar>

            <ng-container *ngIf="showingRussianVerb">
                <mat-card class="card min-size" (click)="next()">
                    <div class="word">
                        {{ getRussianInfinitive() }}
                    </div>
                </mat-card>
            </ng-container>

            <div class="min-size" *ngIf="!showingRussianVerb">
                <div class="latvian-infinitive">
                    {{ getLatvianInfinitive() }}
                </div>
                <random-verbs-training-verb-tense
                    [pastTense]="getPastTense()"
                    [presentTense]="getPresentTense()"
                    [futureTense]="getFutureTense()"
                    (click)="next()"
                >
                </random-verbs-training-verb-tense>
            </div>
        </ng-container>

        <ng-container *ngIf="finished">
            <mat-card class="card min-size" (click)="next()">
                <div class="green word">Training finished</div>
            </mat-card>
        </ng-container>
    `,
    styles: [
        `
            .green {
                color: green;
            }
            .min-size {
                min-width: 340px;
                min-height: 300px;
            }
            .card {
                margin-top: 20px;
            }
            .word {
                padding-top: 120px;
                display: flex;
                justify-content: center;
            }
            .latvian-infinitive {
                display: flex;
                padding-top: 20px;
                padding-bottom: 10px;
                display: flex;
                justify-content: center;
            }
            .progress-text {
                display: flex;
                padding-top: 20px;
                padding-bottom: 10px;
                display: flex;
                justify-content: center;
            }
        `,
    ],
})
export class RandomVerbsTrainingComponent implements OnChanges {
    currentVerbIndex = 0;
    loading = true;
    showingRussianVerb = true;
    finished = false;
    verbs: Verb[] = [];

    @Input()
    randomVerbsTraining: RandomVerbsTraining | null = null;

    constructor(private verbService: VerbService) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (this.randomVerbsTraining) {
            this.loading = true;
            this.startTraining();
        }
    }

    getProgressString() {
        return `${this.currentVerbIndex + 1} of ${(this.verbs || []).length}`;
    }

    calculateProgress() {
        const verbCount = (this.verbs || []).length;
        if (verbCount === 0) {
            return 0;
        }

        return (this.currentVerbIndex / verbCount) * 100;
    }

    getRussianInfinitive() {
        return this.getVerb().russianInfinitive;
    }

    getLatvianInfinitive() {
        return this.getVerb().latvianInfinitive;
    }

    getPastTense() {
        return this.getTense(VerbTenseType.Past);
    }

    getPresentTense() {
        return this.getTense(VerbTenseType.Present);
    }

    getFutureTense() {
        return this.getTense(VerbTenseType.Future);
    }

    getTense(tenseType: VerbTenseType) {
        if (!this.randomVerbsTraining?.verbTenses?.includes(tenseType)) {
            return null;
        }

        switch (tenseType) {
            case VerbTenseType.Past:
                return this.getVerb().indicative.pastLatvian;
            case VerbTenseType.Present:
                return this.getVerb().indicative.presentLatvian;
            case VerbTenseType.Future:
                return this.getVerb().indicative.futureLatvian;
        }

        throw new Error(`Not suported tense ${tenseType}`);
    }

    getVerb() {
        return this.verbs[this.currentVerbIndex];
    }

    next() {
        if (this.showingRussianVerb) {
            this.showingRussianVerb = false;
        } else {
            if (this.currentVerbIndex >= this.verbs.length - 1) {
                this.finished = true;
                return;
            }

            this.currentVerbIndex++;
            this.showingRussianVerb = true;
        }
    }

    private async startTraining() {
        try {
            let allVerbs = await this.verbService.loadAllVerbs();
            this.currentVerbIndex = 0;
            const verbCount = NumberUtils.min(
                this.randomVerbsTraining?.wordCount || 0,
                allVerbs.length
            );

            const trainingVerbs: Verb[] = [];

            for (let i = 0; i < verbCount; i++) {
                const verb =
                    allVerbs[
                        NumberUtils.randomIntFromInterval(
                            0,
                            allVerbs.length - 1
                        )
                    ];
                trainingVerbs.push(verb);
                allVerbs = allVerbs.filter((x) => x !== verb);
            }

            this.currentVerbIndex = 0;
            this.verbs = trainingVerbs;
        } finally {
            this.showingRussianVerb = true;
            this.loading = false;
        }
    }
}
