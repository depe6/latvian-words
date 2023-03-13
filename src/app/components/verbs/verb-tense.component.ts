import { Component, Input } from '@angular/core';
import { VerbMood, VerbTense } from 'src/app/models';

@Component({
    selector: 'verb-tense',
    template: `
        <div class="mat-elevation-z8 container">
            <mat-grid-list cols="5" rowHeight="50px">
                <mat-grid-tile></mat-grid-tile>
                <mat-grid-tile colspan="2">Latvian</mat-grid-tile>
                <mat-grid-tile colspan="2">Russian</mat-grid-tile>
                <mat-grid-tile>Es</mat-grid-tile>
                <mat-grid-tile colspan="2">
                    <mat-form-field class="input">
                        <mat-label></mat-label>
                        <input
                            [(ngModel)]="latvianTense.firstPersonSingular"
                            matInput
                        />
                    </mat-form-field>
                </mat-grid-tile>
                <mat-grid-tile colspan="2">
                    <mat-form-field class="input">
                        <mat-label></mat-label>
                        <input
                            [(ngModel)]="russianTense.firstPersonSingular"
                            matInput
                        />
                    </mat-form-field>
                </mat-grid-tile>
                <mat-grid-tile>Tu</mat-grid-tile>
                <mat-grid-tile colspan="2">
                    <mat-form-field class="input">
                        <mat-label></mat-label>
                        <input
                            [(ngModel)]="latvianTense.secondPersonSingular"
                            matInput
                        />
                    </mat-form-field>
                </mat-grid-tile>
                <mat-grid-tile colspan="2">
                    <mat-form-field class="input">
                        <mat-label></mat-label>
                        <input
                            [(ngModel)]="russianTense.secondPersonSingular"
                            matInput
                        />
                    </mat-form-field>
                </mat-grid-tile>
                <mat-grid-tile>V-š, v-a</mat-grid-tile>
                <mat-grid-tile colspan="2">
                    <mat-form-field class="input">
                        <mat-label></mat-label>
                        <input
                            [(ngModel)]="latvianTense.thirdPersonSingular"
                            matInput
                        />
                    </mat-form-field>
                </mat-grid-tile>
                <mat-grid-tile colspan="2">
                    <mat-form-field class="input">
                        <mat-label></mat-label>
                        <input
                            [(ngModel)]="russianTense.thirdPersonSingular"
                            matInput
                        />
                    </mat-form-field>
                </mat-grid-tile>
                <mat-grid-tile>Mēs</mat-grid-tile>
                <mat-grid-tile colspan="2">
                    <mat-form-field class="input">
                        <mat-label></mat-label>
                        <input
                            [(ngModel)]="latvianTense.firstPersonPlural"
                            matInput
                        />
                    </mat-form-field>
                </mat-grid-tile>
                <mat-grid-tile colspan="2">
                    <mat-form-field class="input">
                        <mat-label></mat-label>
                        <input
                            [(ngModel)]="russianTense.firstPersonPlural"
                            matInput
                        />
                    </mat-form-field>
                </mat-grid-tile>
                <mat-grid-tile>Jūs</mat-grid-tile>
                <mat-grid-tile colspan="2">
                    <mat-form-field class="input">
                        <mat-label></mat-label>
                        <input
                            [(ngModel)]="latvianTense.secondPersonPlural"
                            matInput
                        />
                    </mat-form-field>
                </mat-grid-tile>
                <mat-grid-tile colspan="2">
                    <mat-form-field class="input">
                        <mat-label></mat-label>
                        <input
                            [(ngModel)]="russianTense.secondPersonPlural"
                            matInput
                        />
                    </mat-form-field>
                </mat-grid-tile>
                <mat-grid-tile>V-i, v-as</mat-grid-tile>
                <mat-grid-tile colspan="2">
                    <mat-form-field class="input">
                        <mat-label></mat-label>
                        <input
                            [(ngModel)]="latvianTense.thirdPersonPlural"
                            matInput
                        />
                    </mat-form-field>
                </mat-grid-tile>
                <mat-grid-tile colspan="2">
                    <mat-form-field class="input">
                        <mat-label></mat-label>
                        <input
                            [(ngModel)]="russianTense.thirdPersonPlural"
                            matInput
                        />
                    </mat-form-field>
                </mat-grid-tile>
            </mat-grid-list>
        </div>
    `,
    styles: [
        `
            .container {
                margin: 5px;
            }
            .input {
                padding-right: 5px;
            }
        `,
    ],
})
export class VerbTenseComponent {
    @Input()
    latvianTense: VerbTense = VerbTense.empty();

    @Input()
    russianTense: VerbTense = VerbTense.empty();
}
