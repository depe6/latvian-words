import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NounService } from 'src/app/services';
import { FilterUtils } from 'src/app/utils';
import { Noun, NounDialogData } from '../../models';
import { NounDialogComponent } from './noun-dialog.component';

@Component({
    selector: 'nouns',
    template: `
        <h1>Nouns</h1>
        <ng-container *ngIf="loading === true">
            <mat-spinner></mat-spinner>
        </ng-container>
        <ng-container *ngIf="loading === false">
            <div class="actions">
                <button
                    mat-raised-button
                    color="primary"
                    (click)="onNewNounClick()"
                >
                    Add New
                </button>
            </div>
            <mat-form-field class="filter">
                <mat-label>Filter</mat-label>
                <input matInput (keyup)="applyFilter($event)" #input />
            </mat-form-field>
            <div class="table-container mat-elevation-z8">
                <table mat-table [dataSource]="dataSource">
                    <ng-container matColumnDef="position">
                        <th mat-header-cell *matHeaderCellDef>No.</th>
                        <td mat-cell *matCellDef="let noun">
                            {{ dataSource.data.indexOf(noun) + 1 }}
                        </td>
                    </ng-container>

                    <ng-container matColumnDef="latvian">
                        <th mat-header-cell *matHeaderCellDef>Latvian</th>
                        <td mat-cell *matCellDef="let noun">
                            {{ noun.latvian }}
                        </td>
                    </ng-container>

                    <ng-container matColumnDef="russian">
                        <th mat-header-cell *matHeaderCellDef>Russian</th>
                        <td mat-cell *matCellDef="let noun">
                            {{ noun.russian }}
                        </td>
                    </ng-container>

                    <ng-container matColumnDef="tags">
                        <th mat-header-cell *matHeaderCellDef>Tags</th>
                        <td mat-cell *matCellDef="let noun">
                            {{ (noun.tags || []).join(', ') }}
                        </td>
                    </ng-container>

                    <ng-container matColumnDef="actions">
                        <th mat-header-cell *matHeaderCellDef></th>
                        <td class="row-actions" mat-cell *matCellDef="let noun">
                            <mat-icon
                                class="row-action-button"
                                (click)="onEditNounlick(noun)"
                                >edit</mat-icon
                            >
                            <mat-icon
                                class="row-action-button"
                                (click)="onDeleteNounClick(noun)"
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
            </div>
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
            .table-container {
                max-height: 700px;
                overflow: auto;
            }
            .filter {
                width: 100%;
            }
        `,
    ],
})
export class NounsComponent implements OnInit {
    displayedColumns: string[] = [
        'position',
        'latvian',
        'russian',
        'tags',
        'actions',
    ];
    dataSource = new MatTableDataSource([] as Noun[]);
    loading = false;

    constructor(private dialog: MatDialog, private nounService: NounService) {
        this.dataSource.filterPredicate = (noun: Noun, filter: string) =>
            FilterUtils.filterByContent(noun, filter);
    }

    ngOnInit(): void {
        this.reload();
    }

    onEditNounlick(noun: Noun) {
        this.openNounDialog(noun.clone(), false, async (updatedNoun) => {
            await this.nounService.updateNoun(updatedNoun);
            this.reload();
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    async onDeleteNounClick(noun: Noun) {
        await this.nounService.deleteNoun(noun.id);
        this.reload();
    }

    async onNewNounClick() {
        this.openNounDialog(Noun.empty(), true, async (noun) => {
            await this.nounService.addNoun(noun);
            this.reload();
        });
    }

    private openNounDialog(
        noun: Noun,
        addingNewNoun: boolean,
        saveCallback: (noun: Noun) => void
    ) {
        const dialogRef = this.dialog.open(NounDialogComponent, {
            maxWidth: '600px',
            minWidth: '400px',
            data: {
                noun: noun,
                allNouns: this.dataSource.data,
                addingNewNoun,
            } as NounDialogData,
        });

        dialogRef.afterClosed().subscribe(async (result) => {
            if (result === true) {
                saveCallback(noun);
            }
        });
    }

    private async reload() {
        this.loading = true;

        try {
            const nouns = await this.nounService.loadAllNouns();
            this.dataSource.data = nouns;
        } finally {
            this.loading = false;
        }
    }
}
