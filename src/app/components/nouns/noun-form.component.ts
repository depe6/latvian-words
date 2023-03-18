import {
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
} from '@angular/core';
import { GrammaticalNumber, Noun, NounDeclension } from 'src/app/models';

@Component({
    selector: 'noun-form',
    template: `
        <mat-form-field appearance="fill" class="input">
            <mat-label>Grammatical number</mat-label>
            <mat-select
                [(ngModel)]="selectedGrammaticalNumber"
                (selectionChange)="onGrammaticalNumberSelectionChanged()"
            >
                <mat-option
                    *ngFor="let grammaticalNumber of grammaticalNumbers"
                    [value]="grammaticalNumber"
                >
                    {{ grammaticalNumber }}
                </mat-option>
            </mat-select>
        </mat-form-field>

        <noun-declension
            [latvian]="selectedLatvianDeclension"
            [russian]="selectedRussianDeclension"
        ></noun-declension>
    `,
    styles: [
        `
            .input {
                width: 100%;
            }
        `,
    ],
})
export class NounFormComponent implements OnInit, OnChanges {
    selectedGrammaticalNumber = GrammaticalNumber.Singular;
    grammaticalNumbers = [GrammaticalNumber.Singular, GrammaticalNumber.Plural];
    selectedLatvianDeclension = NounDeclension.empty();
    selectedRussianDeclension = NounDeclension.empty();

    @Input()
    noun: Noun = Noun.empty();

    ngOnInit() {
        this.refreshSelectedGrammaticalNumber();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.refreshSelectedGrammaticalNumber();
    }

    onGrammaticalNumberSelectionChanged() {
        this.refreshSelectedGrammaticalNumber();
    }

    refreshSelectedGrammaticalNumber() {
        if (!this.noun) {
            return;
        }
        switch (this.selectedGrammaticalNumber) {
            case GrammaticalNumber.Singular: {
                this.selectedLatvianDeclension = this.noun.singularLatvian;
                this.selectedRussianDeclension = this.noun.singularRussian;
                break;
            }
            case GrammaticalNumber.Plural: {
                this.selectedLatvianDeclension = this.noun.pluralLatvian;
                this.selectedRussianDeclension = this.noun.pluralRussian;
                break;
            }
        }
    }
}
