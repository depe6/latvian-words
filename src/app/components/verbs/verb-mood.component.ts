import { Component, Input } from '@angular/core';
import { VerbMood } from 'src/app/models';

@Component({
    selector: 'verb-mood',
    template: `
        <mat-tab-group>
            <mat-tab label="Past">
                <verb-tense
                    [latvianTense]="mood.pastLatvian"
                    [russianTense]="mood.pastRussian"
                ></verb-tense>
            </mat-tab>
            <mat-tab label="Present">
                <verb-tense
                    [latvianTense]="mood.presentLatvian"
                    [russianTense]="mood.presentRussian"
                ></verb-tense>
            </mat-tab>
            <mat-tab label="Future">
                <verb-tense
                    [latvianTense]="mood.futureLatvian"
                    [russianTense]="mood.futureRussian"
                ></verb-tense
            ></mat-tab>
        </mat-tab-group>
    `,
    styles: [``],
})
export class VerbMoodComponent {
    @Input()
    mood: VerbMood = VerbMood.empty();
}
