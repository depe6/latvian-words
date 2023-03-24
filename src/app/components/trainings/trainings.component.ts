import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TrainingService } from 'src/app/services';
import {
    Training,
    RandomVerbsTraining,
    RandomVerbsTrainingFormDialogData,
    RandomVerbsTrainingDialogData,
    RandomNounsTraining,
    RandomNounsTrainingFormDialogData,
    RandomNounsTrainingDialogData,
} from '../../models';
import { RandomNounsTrainingDialogComponent } from './random-nouns/random-nouns-training-dialog.component';
import { RandomNounsTrainingFormDialogComponent } from './random-nouns/random-nouns-training-form-dialog.component';
import { RandomVerbsTrainingDialogComponent } from './random-verbs/random-verbs-training-dialog.component';
import { RandomVerbsTrainingFormDialogComponent } from './random-verbs/random-verbs-training-form-dialog.component';

@Component({
    selector: 'trainings',
    template: `
        <h1>Trainings</h1>
        <ng-container *ngIf="loading === true">
            <mat-spinner></mat-spinner>
        </ng-container>
        <ng-container *ngIf="loading === false">
            <div class="actions">
                <button mat-button [matMenuTriggerFor]="menu">Add New</button>
                <mat-menu #menu="matMenu">
                    <button
                        mat-menu-item
                        (click)="onNewRandomVerbsTrainingClick()"
                    >
                        Random Verbs Training
                    </button>
                    <button
                        mat-menu-item
                        (click)="onNewRandomNounsTrainingClick()"
                    >
                        Random Nouns Training
                    </button>
                </mat-menu>
            </div>
            <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">
                <ng-container matColumnDef="position">
                    <th mat-header-cell *matHeaderCellDef>No.</th>
                    <td mat-cell *matCellDef="let training">
                        {{ dataSource.indexOf(training) + 1 }}
                    </td>
                </ng-container>

                <ng-container matColumnDef="start">
                    <th mat-header-cell *matHeaderCellDef></th>
                    <td mat-cell *matCellDef="let training">
                        <button
                            mat-raised-button
                            color="primary"
                            (click)="onStartTrainingClick(training)"
                        >
                            Start
                        </button>
                    </td>
                </ng-container>

                <ng-container matColumnDef="name">
                    <th mat-header-cell *matHeaderCellDef>Name</th>
                    <td mat-cell *matCellDef="let training">
                        {{ training.name }}
                    </td>
                </ng-container>

                <ng-container matColumnDef="tags">
                    <th mat-header-cell *matHeaderCellDef>Tags</th>
                    <td mat-cell *matCellDef="let training">
                        {{ (training.tags || []).join(', ') }}
                    </td>
                </ng-container>

                <ng-container matColumnDef="actions">
                    <th mat-header-cell *matHeaderCellDef></th>
                    <td class="row-actions" mat-cell *matCellDef="let training">
                        <mat-icon
                            class="row-action-button"
                            (click)="onEditTrainingClick(training)"
                            >edit</mat-icon
                        >
                        <mat-icon
                            class="row-action-button"
                            (click)="onDeleteTrainingClick(training)"
                            >delete</mat-icon
                        >
                    </td>
                </ng-container>

                <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                <tr
                    mat-row
                    *matRowDef="let row; columns: displayedColumns"
                ></tr>
            </table>
        </ng-container>
    `,
    styles: [
        `
            .actions {
                padding-bottom: 10px;
            }

            .row-actions {
                padding: 0px;
                width: 50px;
            }

            .row-action-button {
                padding: 0px;
                cursor: pointer;
            }
        `,
    ],
})
export class TrainingsComponent implements OnInit {
    displayedColumns: string[] = [
        'position',
        'start',
        'name',
        'tags',
        'actions',
    ];
    dataSource: Training[] = [];
    loading = false;

    constructor(
        private dialog: MatDialog,
        private trainingService: TrainingService
    ) {}

    ngOnInit(): void {
        this.reload();
    }

    onEditTrainingClick(training: Training) {
        if (training instanceof RandomVerbsTraining) {
            this.openRanomVerbsTrainingDialog(
                training.clone(),
                async (updatedTraining) => {
                    await this.trainingService.updateTraining(updatedTraining);
                    this.reload();
                }
            );
        }
        if (training instanceof RandomNounsTraining) {
            this.openRandomNounsTrainingDialog(
                training.clone(),
                async (updatedTraining) => {
                    await this.trainingService.updateTraining(updatedTraining);
                    this.reload();
                }
            );
        }
    }

    onStartTrainingClick(training: Training) {
        if (training instanceof RandomVerbsTraining) {
            this.dialog.open(RandomVerbsTrainingDialogComponent, {
                maxWidth: '600px',
                data: {
                    randomVerbsTraining: training,
                } as RandomVerbsTrainingDialogData,
            });
        }

        if (training instanceof RandomNounsTraining) {
            this.dialog.open(RandomNounsTrainingDialogComponent, {
                maxWidth: '600px',
                data: {
                    randomNounsTraining: training,
                } as RandomNounsTrainingDialogData,
            });
        }
    }

    async onDeleteTrainingClick(training: Training) {
        await this.trainingService.deleteTraining(training.id);
        this.reload();
    }

    async onNewRandomVerbsTrainingClick() {
        this.openRanomVerbsTrainingDialog(
            RandomVerbsTraining.empty(),
            async (training) => {
                await this.trainingService.addTraining(training);
                this.reload();
            }
        );
    }

    async onNewRandomNounsTrainingClick() {
        this.openRandomNounsTrainingDialog(
            RandomNounsTraining.empty(),
            async (training) => {
                await this.trainingService.addTraining(training);
                this.reload();
            }
        );
    }

    private openRanomVerbsTrainingDialog(
        randomVerbsTraining: RandomVerbsTraining,
        saveCallback: (verbTraining: RandomVerbsTraining) => void
    ) {
        const dialogRef = this.dialog.open(
            RandomVerbsTrainingFormDialogComponent,
            {
                maxWidth: '600px',
                data: {
                    randomVerbsTraining,
                } as RandomVerbsTrainingFormDialogData,
            }
        );

        dialogRef.afterClosed().subscribe(async (result) => {
            if (result === true) {
                saveCallback(randomVerbsTraining);
            }
        });
    }

    private openRandomNounsTrainingDialog(
        randomNounsTraining: RandomNounsTraining,
        saveCallback: (nounTraining: RandomNounsTraining) => void
    ) {
        const dialogRef = this.dialog.open(
            RandomNounsTrainingFormDialogComponent,
            {
                maxWidth: '600px',
                data: {
                    randomNounsTraining: randomNounsTraining,
                } as RandomNounsTrainingFormDialogData,
            }
        );

        dialogRef.afterClosed().subscribe(async (result) => {
            if (result === true) {
                saveCallback(randomNounsTraining);
            }
        });
    }

    private async reload() {
        this.loading = true;

        try {
            this.dataSource = await this.trainingService.loadAllTrainings();
        } finally {
            this.loading = false;
        }
    }
}
