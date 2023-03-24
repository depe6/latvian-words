import { Component, Input } from '@angular/core';
import { NounDeclension } from 'src/app/models';

@Component({
    selector: 'random-nouns-training-noun',
    template: `
        <div class="mat-elevation-z8 container">
            <mat-grid-list [cols]="5" rowHeight="30px">
                <mat-grid-tile></mat-grid-tile>
                <mat-grid-tile colspan="2" class="header">
                    Vienskaitlis
                </mat-grid-tile>
                <mat-grid-tile colspan="2" class="header"
                    >Daudzskaitlis</mat-grid-tile
                >

                <mat-grid-tile
                    >Nom.<span class="small">kas?</span></mat-grid-tile
                >
                <mat-grid-tile colspan="2">{{
                    singularLatvian.nominativs
                }}</mat-grid-tile>
                <mat-grid-tile colspan="2">{{
                    pluralLatvian.nominativs
                }}</mat-grid-tile>

                <mat-grid-tile
                    >Ģen.<span class="small">kā?</span></mat-grid-tile
                >
                <mat-grid-tile colspan="2">{{
                    singularLatvian.genitivs
                }}</mat-grid-tile>
                <mat-grid-tile colspan="2">{{
                    pluralLatvian.genitivs
                }}</mat-grid-tile>

                <mat-grid-tile
                    >Dat.<span class="small">kam?</span></mat-grid-tile
                >
                <mat-grid-tile colspan="2">{{
                    singularLatvian.dativs
                }}</mat-grid-tile>
                <mat-grid-tile colspan="2">{{
                    pluralLatvian.dativs
                }}</mat-grid-tile>

                <mat-grid-tile
                    >Akuz.<span class="small">ko?</span></mat-grid-tile
                >
                <mat-grid-tile colspan="2">{{
                    singularLatvian.akuzativs
                }}</mat-grid-tile>
                <mat-grid-tile colspan="2">{{
                    pluralLatvian.akuzativs
                }}</mat-grid-tile>

                <mat-grid-tile
                    >Inst.<span class="small">ar ko?</span></mat-grid-tile
                >
                <mat-grid-tile colspan="2">{{
                    singularLatvian.instrumentalis
                }}</mat-grid-tile>
                <mat-grid-tile colspan="2">{{
                    pluralLatvian.instrumentalis
                }}</mat-grid-tile>

                <mat-grid-tile
                    >Lok.<span class="small">kur?</span></mat-grid-tile
                >
                <mat-grid-tile colspan="2">{{
                    singularLatvian.lokativs
                }}</mat-grid-tile>
                <mat-grid-tile colspan="2">{{
                    pluralLatvian.lokativs
                }}</mat-grid-tile>

                <mat-grid-tile>Vok.<span class="small">!</span></mat-grid-tile>
                <mat-grid-tile colspan="2">{{
                    singularLatvian.vokativs
                }}</mat-grid-tile>
                <mat-grid-tile colspan="2">{{
                    pluralLatvian.vokativs
                }}</mat-grid-tile>
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
            .small {
                font-size: 10px;
            }
        `,
    ],
})
export class RandomNounsTrainingNounComponent {
    @Input()
    singularLatvian: NounDeclension = NounDeclension.empty();

    @Input()
    pluralLatvian: NounDeclension = NounDeclension.empty();
}
