import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services';

@Component({
    selector: 'login',
    template: `
        <div class="container">
            <mat-card class="card">
                <mat-card-content>
                    <mat-card-header>
                        <mat-card-title>Authenticate</mat-card-title>
                    </mat-card-header>
                    <form [formGroup]="form">
                        <mat-form-field class="input">
                            <mat-label>Username</mat-label>
                            <input
                                id="username"
                                formControlName="username"
                                matInput
                            />
                        </mat-form-field>
                        <mat-form-field class="input">
                            <mat-label>Password</mat-label>
                            <input
                                id="password"
                                type="password"
                                formControlName="password"
                                matInput
                            />
                        </mat-form-field>
                    </form>
                    <div class="button-container">
                        <span class="example-spacer"></span>
                        <button mat-button color="primary" (click)="onLogin()">
                            Login
                        </button>
                    </div>
                </mat-card-content>
            </mat-card>
        </div>
    `,
    styles: [
        `
            .container {
                display: flex;
                justify-content: center;
                padding-top: 200px;
            }
            .button-container {
                display: flex;
            }
            .example-spacer {
                flex: 1 1 auto;
            }
            .card {
                max-width: 400px;
                margin: 15px;
            }
            .input {
                width: 100%;
            }
        `,
    ],
})
export class LoginComponent {
    form = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
    });

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService
    ) {}

    onLogin() {
        if (this.form.invalid) {
            return;
        }

        this.authService.login(
            this.form.controls.username.value!,
            this.form.controls.password.value!
        );
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigateByUrl(returnUrl);
    }
}
