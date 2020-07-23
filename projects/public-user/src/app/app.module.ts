import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {VendorsModule} from 'projects/vendors/src/lib/vendors.module';
import {DefaultModule} from 'projects/public-user/src/app/layout/default/default.module';
import {ProjectService} from 'projects/tools/src/lib/project.service';
import {UserService} from 'projects/tools/src/lib/user.service';
import {NewsService} from 'projects/tools/src/lib/news.service';
import {FileService} from 'projects/tools/src/lib/file.service';
import {ToastrModule} from 'ngx-toastr';
import {OtherService} from 'projects/tools/src/lib/other.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    VendorsModule,
    DefaultModule,
    ToastrModule.forRoot({ timeOut: 3000 }),
  ],
  providers: [NewsService, UserService, FileService, OtherService],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
