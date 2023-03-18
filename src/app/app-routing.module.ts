import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
    LoginComponent,
    NounsComponent,
    SummaryComponent,
    TrainingsComponent,
    VerbsComponent,
} from './components';
import { HomeComponent } from './components/home.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component: SummaryComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'verbs',
                component: VerbsComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'nouns',
                component: NounsComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'trainings',
                component: TrainingsComponent,
                canActivate: [AuthGuard],
            },
        ],
    },
    { path: 'login', component: LoginComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
