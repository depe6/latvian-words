import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { AuthService } from '../services';

@Component({
    selector: 'home',
    template: `
        <div class="container" [class.is-mobile]="mobileQuery.matches">
            <mat-toolbar color="primary" class="toolbar">
                <button mat-icon-button (click)="snav.toggle()">
                    <mat-icon>menu</mat-icon>
                </button>
                <h1 class="app-name">Latvian Words</h1>
            </mat-toolbar>

            <mat-sidenav-container
                class="sidenav-container"
                [style.marginTop.px]="mobileQuery.matches ? 56 : 0"
            >
                <mat-sidenav
                    #snav
                    [mode]="mobileQuery.matches ? 'over' : 'side'"
                    [fixedInViewport]="mobileQuery.matches"
                    fixedTopGap="56"
                >
                    <mat-nav-list>
                        <a mat-list-item routerLink="trainings">Trainings</a>
                        <a mat-list-item routerLink="verbs">Verbs</a>
                        <a mat-list-item routerLink="nouns">Nouns</a>

                        <div class="menu-spacer"></div>
                        <a mat-list-item (click)="onLogout()">Logout</a>
                        <!-- <a
                            mat-list-item
                            routerLink="."
                            *ngFor="let nav of fillerNav"
                            >{{ nav }}</a
                        > -->
                    </mat-nav-list>
                </mat-sidenav>

                <mat-sidenav-content>
                    <div class="content">
                        <router-outlet> </router-outlet>
                    </div>
                </mat-sidenav-content>
            </mat-sidenav-container>
        </div>
    `,
    styles: [
        `
            .container {
                display: flex;
                flex-direction: column;
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
            }

            .is-mobile .toolbar {
                position: fixed;
                z-index: 2;
            }

            h1.app-name {
                margin-left: 8px;
                margin-bottom: 0px;
            }

            .sidenav-container {
                flex: 1;
            }

            .is-mobile .sidenav-container {
                flex: 1 0 auto;
            }

            .menu-spacer {
                border-bottom: 1px solid gray;
            }

            .content {
                padding: 10px;
            }
        `,
    ],
})
export class HomeComponent {
    mobileQuery: MediaQueryList;
    private _mobileQueryListener: () => void;

    constructor(
        changeDetectorRef: ChangeDetectorRef,
        media: MediaMatcher,
        private authService: AuthService
    ) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }

    onLogout() {
        this.authService.logout();
    }
}
