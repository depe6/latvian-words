import { Component, Input } from '@angular/core';
import { VerbTense } from 'src/app/models';

@Component({
    selector: 'random-verbs-training-verb-tense',
    template: `
        <div class="mat-elevation-z8 container">
            <mat-grid-list [cols]="colCount()" rowHeight="30px">
                <mat-grid-tile></mat-grid-tile>
                <mat-grid-tile colspan="2" *ngIf="pastTense" class="header">
                    Pagātne
                </mat-grid-tile>
                <mat-grid-tile colspan="2" *ngIf="presentTense" class="header"
                    >Tagadne</mat-grid-tile
                >
                <mat-grid-tile colspan="2" *ngIf="futureTense" class="header"
                    >Nākotne</mat-grid-tile
                >

                <mat-grid-tile>Es</mat-grid-tile>
                <mat-grid-tile colspan="2" *ngIf="pastTense">{{
                    pastTense.firstPersonSingular
                }}</mat-grid-tile>
                <mat-grid-tile colspan="2" *ngIf="presentTense">{{
                    presentTense.firstPersonSingular
                }}</mat-grid-tile>
                <mat-grid-tile colspan="2" *ngIf="futureTense">{{
                    futureTense.firstPersonSingular
                }}</mat-grid-tile>

                <mat-grid-tile>Tu</mat-grid-tile>
                <mat-grid-tile colspan="2" *ngIf="pastTense">
                    {{ pastTense.secondPersonSingular }}
                </mat-grid-tile>
                <mat-grid-tile colspan="2" *ngIf="presentTense">
                    {{ presentTense.secondPersonSingular }}
                </mat-grid-tile>
                <mat-grid-tile colspan="2" *ngIf="futureTense">
                    {{ futureTense.secondPersonSingular }}
                </mat-grid-tile>

                <mat-grid-tile>V-š, v-a</mat-grid-tile>
                <mat-grid-tile colspan="2" *ngIf="pastTense">
                    {{ pastTense.thirdPersonSingular }}
                </mat-grid-tile>
                <mat-grid-tile colspan="2" *ngIf="presentTense">
                    {{ presentTense.thirdPersonSingular }}
                </mat-grid-tile>
                <mat-grid-tile colspan="2" *ngIf="futureTense">
                    {{ futureTense.thirdPersonSingular }}
                </mat-grid-tile>

                <mat-grid-tile>Mēs</mat-grid-tile>
                <mat-grid-tile colspan="2" *ngIf="pastTense">
                    {{ pastTense.firstPersonPlural }}
                </mat-grid-tile>
                <mat-grid-tile colspan="2" *ngIf="presentTense">
                    {{ presentTense.firstPersonPlural }}
                </mat-grid-tile>
                <mat-grid-tile colspan="2" *ngIf="futureTense">
                    {{ futureTense.firstPersonPlural }}
                </mat-grid-tile>

                <mat-grid-tile>Jūs</mat-grid-tile>
                <mat-grid-tile colspan="2" *ngIf="pastTense">
                    {{ pastTense.secondPersonPlural }}
                </mat-grid-tile>
                <mat-grid-tile colspan="2" *ngIf="presentTense">
                    {{ presentTense.secondPersonPlural }}
                </mat-grid-tile>
                <mat-grid-tile colspan="2" *ngIf="futureTense">
                    {{ futureTense.secondPersonPlural }}
                </mat-grid-tile>

                <mat-grid-tile>V-i, v-as</mat-grid-tile>
                <mat-grid-tile colspan="2" *ngIf="pastTense">
                    {{ pastTense.thirdPersonPlural }}
                </mat-grid-tile>
                <mat-grid-tile colspan="2" *ngIf="presentTense">
                    {{ presentTense.thirdPersonPlural }}
                </mat-grid-tile>
                <mat-grid-tile colspan="2" *ngIf="futureTense">
                    {{ futureTense.thirdPersonPlural }}
                </mat-grid-tile>
            </mat-grid-list>
        </div>
    `,
    styles: [
        `
            .container {
                margin: 5px;
            }
            .header {
                font-weight: bold;
            }
        `,
    ],
})
export class RandmVerbsTrainingVerbTenseComponent {
    @Input()
    pastTense: VerbTense | null = null;

    @Input()
    presentTense: VerbTense | null = null;

    @Input()
    futureTense: VerbTense | null = null;

    colCount() {
        return (
            1 +
            (this.pastTense ? 2 : 0) +
            (this.presentTense ? 2 : 0) +
            (this.futureTense ? 2 : 0)
        );
    }
}
