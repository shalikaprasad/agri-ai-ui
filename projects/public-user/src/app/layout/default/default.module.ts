import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DefaultComponent} from 'projects/public-user/src/app/layout/default/default.component';
import {HomeComponent} from 'projects/public-user/src/app/module/home/home.component';
import {RouterModule} from '@angular/router';
import {VendorsModule} from 'projects/vendors/src/lib/vendors.module';
import {SharedModule} from 'projects/public-user/src/app/shared/shared.module';
import {CropPredictionComponent} from 'projects/public-user/src/app/module/crop-prediction/crop-prediction.component';
import {NewsComponent} from 'projects/public-user/src/app/module/news/news.component';
import {ProfileComponent} from 'projects/public-user/src/app/module/profile/profile.component';
import {BestCropComponent} from 'projects/public-user/src/app/module/best-crop/best-crop.component';
import {WeatherPredictionComponent} from 'projects/public-user/src/app/module/weather-prediction/weather-prediction.component';
import {AboutComponent} from 'projects/public-user/src/app/module/about/about.component';
import {ContactUsComponent} from 'projects/public-user/src/app/module/contact-us/contact-us.component';
import {LoadingComponent} from 'projects/public-user/src/app/module/loading/loading.component';
import {CropPredictionResultComponent} from 'projects/public-user/src/app/module/crop-prediction-result/crop-prediction-result.component';
import {BestCropResultComponent} from 'projects/public-user/src/app/module/best-crop-result/best-crop-result.component';

@NgModule({
  declarations: [
    DefaultComponent,
    HomeComponent,
    CropPredictionComponent,
    NewsComponent,
    ProfileComponent,
    BestCropComponent,
    WeatherPredictionComponent,
    AboutComponent,
    ContactUsComponent,
    BestCropComponent,
    WeatherPredictionComponent,
    AboutComponent,
    ContactUsComponent,
    LoadingComponent,
    CropPredictionResultComponent,
    BestCropResultComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    VendorsModule,
    SharedModule
  ]
})
export class DefaultModule { }
