import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DefaultModule} from 'projects/administration/src/app/layout/default/default.module';
import {RegistrationModule} from 'projects/administration/src/app/layout/registration/registration.module';
import {ProjectService} from 'projects/tools/src/lib/project.service';
import {UserService} from 'projects/tools/src/lib/user.service';
import {FileService} from 'projects/tools/src/lib/file.service';
import {DatePipe} from '@angular/common';
import {DashboardService} from 'projects/tools/src/lib/dashboard.service';
import {CropService} from 'projects/tools/src/lib/crop.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DefaultModule,
    RegistrationModule
  ],
  providers: [ProjectService, UserService, FileService, DatePipe, DashboardService, CropService],
  bootstrap: [AppComponent],
  schemas: [
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA
]
})
export class DashboardModule { }
