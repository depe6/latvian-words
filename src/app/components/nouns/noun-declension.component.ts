import { Component, Input } from '@angular/core';
import { NounDeclension } from 'src/app/models';

@Component({
    selector: 'noun-declension',
    template: `
        <div class="mat-elevation-z8 container">
            <mat-grid-list cols="5" rowHeight="50px">
                <mat-grid-tile></mat-grid-tile>
                <mat-grid-tile colspan="2">Latvian</mat-grid-tile>
                <mat-grid-tile colspan="2">Russian</mat-grid-tile>
                <mat-grid-tile
                    >Nom.<span class="small">kas?</span></mat-grid-tile
                >
                <mat-grid-tile colspan="2">
                    <mat-form-field class="input">
                        <mat-label></mat-label>
                        <input [(ngModel)]="latvian.nominativs" matInput />
                    </mat-form-field>
                </mat-grid-tile>
                <mat-grid-tile colspan="2">
                    <mat-form-field class="input">
                        <mat-label></mat-label>
                        <input [(ngModel)]="russian.nominativs" matInput />
                    </mat-form-field>
                </mat-grid-tile>
                <mat-grid-tile
                    >Ģen.<span class="small">kā?</span></mat-grid-tile
                >
                <mat-grid-tile colspan="2">
                    <mat-form-field class="input">
                        <mat-label></mat-label>
                        <input [(ngModel)]="latvian.genitivs" matInput />
                    </mat-form-field>
                </mat-grid-tile>
                <mat-grid-tile colspan="2">
                    <mat-form-field class="input">
                        <mat-label></mat-label>
                        <input [(ngModel)]="russian.genitivs" matInput />
                    </mat-form-field>
                </mat-grid-tile>
                <mat-grid-tile
                    >Dat.<span class="small">kam?</span></mat-grid-tile
                >
                <mat-grid-tile colspan="2">
                    <mat-form-field class="input">
                        <mat-label></mat-label>
                        <input [(ngModel)]="latvian.dativs" matInput />
                    </mat-form-field>
                </mat-grid-tile>
                <mat-grid-tile colspan="2">
                    <mat-form-field class="input">
                        <mat-label></mat-label>
                        <input [(ngModel)]="russian.dativs" matInput />
                    </mat-form-field>
                </mat-grid-tile>
                <mat-grid-tile
                    >Akuz.<span class="small">ko?</span></mat-grid-tile
                >
                <mat-grid-tile colspan="2">
                    <mat-form-field class="input">
                        <mat-label></mat-label>
                        <input [(ngModel)]="latvian.akuzativs" matInput />
                    </mat-form-field>
                </mat-grid-tile>
                <mat-grid-tile colspan="2">
                    <mat-form-field class="input">
                        <mat-label></mat-label>
                        <input [(ngModel)]="russian.akuzativs" matInput />
                    </mat-form-field>
                </mat-grid-tile>
                <mat-grid-tile
                    >Inst.<span class="small">ar ko?</span></mat-grid-tile
                >
                <mat-grid-tile colspan="2">
                    <mat-form-field class="input">
                        <mat-label></mat-label>
                        <input [(ngModel)]="latvian.instrumentalis" matInput />
                    </mat-form-field>
                </mat-grid-tile>
                <mat-grid-tile colspan="2">
                    <mat-form-field class="input">
                        <mat-label></mat-label>
                        <input [(ngModel)]="russian.instrumentalis" matInput />
                    </mat-form-field>
                </mat-grid-tile>
                <mat-grid-tile
                    >Lok.<span class="small">kur?</span></mat-grid-tile
                >
                <mat-grid-tile colspan="2">
                    <mat-form-field class="input">
                        <mat-label></mat-label>
                        <input [(ngModel)]="latvian.lokativs" matInput />
                    </mat-form-field>
                </mat-grid-tile>
                <mat-grid-tile colspan="2">
                    <mat-form-field class="input">
                        <mat-label></mat-label>
                        <input [(ngModel)]="russian.lokativs" matInput />
                    </mat-form-field>
                </mat-grid-tile>
                <mat-grid-tile>Vok.<span class="small">!</span></mat-grid-tile>
                <mat-grid-tile colspan="2">
                    <mat-form-field class="input">
                        <mat-label></mat-label>
                        <input [(ngModel)]="latvian.vokativs" matInput />
                    </mat-form-field>
                </mat-grid-tile>
                <mat-grid-tile colspan="2">
                    <mat-form-field class="input">
                        <mat-label></mat-label>
                        <input [(ngModel)]="russian.vokativs" matInput />
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
            .small {
                font-size: 10px;
            }
        `,
    ],
})
export class NounDeclensionComponent {
    @Input()
    latvian: NounDeclension = NounDeclension.empty();

    @Input()
    russian: NounDeclension = NounDeclension.empty();
}
