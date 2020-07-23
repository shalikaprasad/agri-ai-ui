import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {VendorsModule} from 'projects/vendors/src/lib/vendors.module';
import {AuthenticationService} from 'projects/tools/src/lib/authentication.service';
import {UserService} from 'projects/tools/src/lib/user.service';
import {NewsService} from 'projects/tools/src/lib/news.service';
import {CropPredictionService} from 'projects/tools/src/lib/crop-prediction.service';
import {RegistrationComponent} from 'projects/administration/src/app/layout/registration/registration.component';
import {LoginComponent} from 'projects/administration/src/app/module/login/login.component';
import {SignupComponent} from 'projects/administration/src/app/module/signup/signup.component';
import {LoadingComponent} from 'projects/administration/src/app/module/loading/loading.component';
import {SocketService} from 'projects/tools/src/lib/socket.service';


@NgModule({
  declarations: [
    RegistrationComponent,
    LoginComponent,
    SignupComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    VendorsModule
  ],
  providers: [
    AuthenticationService,
    UserService,
    NewsService,
    CropPredictionService,
    SocketService
  ]
})
export class RegistrationModule { }
