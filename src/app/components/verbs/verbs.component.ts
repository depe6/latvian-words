import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { from, mergeMap, of } from 'rxjs';
import { VerbService } from 'src/app/services';
import { Verb, VerbDialogData } from '../../models';
import { VerbDialogComponent } from './verb-dialog.component';

@Component({
    selector: 'verbs',
    template: `
        <h1>Verbs</h1>
        <ng-container *ngIf="loading === true">
            <mat-spinner></mat-spinner>
        </ng-container>
        <ng-container *ngIf="loading === false">
            <div class="actions">
                <button
                    mat-raised-button
                    color="primary"
                    (click)="onNewVerbClick()"
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
                        <td mat-cell *matCellDef="let verb">
                            {{ dataSource.data.indexOf(verb) + 1 }}
                        </td>
                    </ng-container>

                    <ng-container matColumnDef="latvianInfinitive">
                        <th mat-header-cell *matHeaderCellDef>Latvian</th>
                        <td mat-cell *matCellDef="let verb">
                            {{ verb.latvianInfinitive }}
                        </td>
                    </ng-container>

                    <ng-container matColumnDef="russianInfinitive">
                        <th mat-header-cell *matHeaderCellDef>Russian</th>
                        <td mat-cell *matCellDef="let verb">
                            {{ verb.russianInfinitive }}
                        </td>
                    </ng-container>

                    <ng-container matColumnDef="tags">
                        <th mat-header-cell *matHeaderCellDef>Tags</th>
                        <td mat-cell *matCellDef="let verb">
                            {{ (verb.tags || []).join(', ') }}
                        </td>
                    </ng-container>

                    <ng-container matColumnDef="actions">
                        <th mat-header-cell *matHeaderCellDef></th>
                        <td class="row-actions" mat-cell *matCellDef="let verb">
                            <mat-icon
                                class="row-action-button"
                                (click)="onEditVerbClick(verb)"
                                >edit</mat-icon
                            >
                            <mat-icon
                                class="row-action-button"
                                (click)="onDeleteVerbClick(verb)"
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
export class VerbsComponent implements OnInit {
    displayedColumns: string[] = [
        'position',
        'latvianInfinitive',
        'russianInfinitive',
        'tags',
        'actions',
    ];
    dataSource = new MatTableDataSource([] as Verb[]);
    loading = false;

    constructor(private dialog: MatDialog, private verbService: VerbService) {
        this.dataSource.filterPredicate = (verb: Verb, filter: string) => {
            if ((filter || '').length === 0) {
                return true;
            }

            const verbString = this.toPropString(verb);
            const verbNormalized = verbString
                .normalize('NFD')
                .replace(/\p{Diacritic}/gu, '');

            return verbNormalized.toLowerCase().includes(filter.toLowerCase());
        };
    }

    private toPropString(obj: any): string {
        if (obj === null || obj === undefined) {
            return '';
        }

        if (typeof obj === 'object') {
            const propValues: string[] = [];
            for (const prop in obj) {
                if (prop?.toLowerCase() === 'id') {
                    continue;
                }
                propValues.push(this.toPropString(obj[prop]));
            }
            return propValues.join('');
        }

        return obj.toString();
    }

    ngOnInit(): void {
        this.reload();
    }

    onEditVerbClick(verb: Verb) {
        this.openVerbDialog(verb.clone(), false, async (updatedVerb) => {
            await this.verbService.updateVerb(updatedVerb);
            this.reload();
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    async onDeleteVerbClick(verb: Verb) {
        await this.verbService.deleteVerb(verb.id);
        this.reload();
    }

    async onNewVerbClick() {
        this.openVerbDialog(Verb.empty(), true, async (verb) => {
            await this.verbService.addVerb(verb);
            this.reload();
        });
    }

    private openVerbDialog(
        verb: Verb,
        addingNewVerb: boolean,
        saveCallback: (verb: Verb) => void
    ) {
        const dialogRef = this.dialog.open(VerbDialogComponent, {
            maxWidth: '600px',
            data: {
                verb,
                allVerbs: this.dataSource.data,
                addingNewVerb,
            } as VerbDialogData,
        });

        dialogRef.afterClosed().subscribe(async (result) => {
            if (result === true) {
                saveCallback(verb);
            }
        });
    }

    private async reload() {
        this.loading = true;

        try {
            const verbs = await this.verbService.loadAllVerbs();
            this.dataSource.data = verbs;
        } finally {
            this.loading = false;
        }
    }
}
