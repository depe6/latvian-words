import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Noun, RandomNounsTraining } from 'src/app/models';
import { NounService } from 'src/app/services';
import { NumberUtils } from 'src/app/utils';

@Component({
    selector: 'random-nouns-training',
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

            <ng-container *ngIf="showingRussianNoun">
                <mat-card class="card min-size" (click)="next()">
                    <div class="word">
                        {{ getRussianNoun() }}
                    </div>
                </mat-card>
            </ng-container>

            <div class="min-size" *ngIf="!showingRussianNoun">
                <div class="latvian-noun">
                    {{ getLatvianNoun() }}
                </div>
                <random-nouns-training-noun
                    [singularLatvian]="getSingularLatvian()"
                    [pluralLatvian]="getPluralLatvian()"
                    (click)="next()"
                >
                </random-nouns-training-noun>
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
            .latvian-noun {
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
export class RandomNounsTrainingComponent implements OnChanges {
    currentNounIndex = 0;
    loading = true;
    showingRussianNoun = true;
    finished = false;
    nouns: Noun[] = [];

    @Input()
    randomNounsTraining: RandomNounsTraining | null = null;

    constructor(private nounService: NounService) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (this.randomNounsTraining) {
            this.loading = true;
            this.startTraining();
        }
    }

    getProgressString() {
        return `${this.currentNounIndex + 1} of ${(this.nouns || []).length}`;
    }

    calculateProgress() {
        const nounCount = (this.nouns || []).length;
        if (nounCount === 0) {
            return 0;
        }

        return (this.currentNounIndex / nounCount) * 100;
    }

    getRussianNoun() {
        return this.getNoun().russian;
    }

    getLatvianNoun() {
        return this.getNoun().latvian;
    }

    getSingularLatvian() {
        return this.getNoun().singularLatvian;
    }

    getPluralLatvian() {
        return this.getNoun().pluralLatvian;
    }

    getNoun() {
        return this.nouns[this.currentNounIndex];
    }

    next() {
        if (this.showingRussianNoun) {
            this.showingRussianNoun = false;
        } else {
            if (this.currentNounIndex >= this.nouns.length - 1) {
                this.finished = true;
                return;
            }

            this.currentNounIndex++;
            this.showingRussianNoun = true;
        }
    }

    private async startTraining() {
        try {
            let allNouns = await this.nounService.loadAllNouns();
            this.currentNounIndex = 0;
            const nounCount = NumberUtils.min(
                this.randomNounsTraining?.wordCount || 0,
                allNouns.length
            );

            const trainingNouns: Noun[] = [];

            for (let i = 0; i < nounCount; i++) {
                const noun =
                    allNouns[
                        NumberUtils.randomIntFromInterval(
                            0,
                            allNouns.length - 1
                        )
                    ];
                trainingNouns.push(noun);
                allNouns = allNouns.filter((x) => x !== noun);
            }

            this.currentNounIndex = 0;
            this.nouns = trainingNouns;
        } finally {
            this.showingRussianNoun = true;
            this.loading = false;
        }
    }
}
