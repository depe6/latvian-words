import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    HomeComponent,
    LoginComponent,
    MessageDialogComponent,
    RandomVerbsTrainingComponent,
    RandomVerbsTrainingFormDialogComponent,
    RandomVerbsTrainingFormComponent,
    SummaryComponent,
    TrainingsComponent,
    VerbDialogComponent,
    VerbFormComponent,
    VerbMoodComponent,
    VerbsComponent,
    VerbTenseComponent,
    RandomVerbsTrainingDialogComponent,
    RandmVerbsTrainingVerbTenseComponent,
} from './components';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        VerbsComponent,
        SummaryComponent,
        VerbFormComponent,
        VerbDialogComponent,
        VerbMoodComponent,
        VerbTenseComponent,
        MessageDialogComponent,
        TrainingsComponent,
        RandomVerbsTrainingFormComponent,
        RandomVerbsTrainingFormDialogComponent,
        RandomVerbsTrainingComponent,
        RandomVerbsTrainingDialogComponent,
        RandmVerbsTrainingVerbTenseComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
