import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoadingComponent} from 'projects/public-user/src/app/module/loading/loading.component';
import {DefaultComponent} from 'projects/public-user/src/app/layout/default/default.component';
import {HomeComponent} from 'projects/public-user/src/app/module/home/home.component';
import {AboutComponent} from 'projects/public-user/src/app/module/about/about.component';
import {ContactUsComponent} from 'projects/public-user/src/app/module/contact-us/contact-us.component';
import {CropPredictionComponent} from 'projects/public-user/src/app/module/crop-prediction/crop-prediction.component';
import {NewsComponent} from 'projects/public-user/src/app/module/news/news.component';
import {ProfileComponent} from 'projects/public-user/src/app/module/profile/profile.component';
import {BestCropComponent} from 'projects/public-user/src/app/module/best-crop/best-crop.component';
import {WeatherPredictionComponent} from 'projects/public-user/src/app/module/weather-prediction/weather-prediction.component';
import {CropPredictionResultComponent} from 'projects/public-user/src/app/module/crop-prediction-result/crop-prediction-result.component';
import {BestCropResultComponent} from 'projects/public-user/src/app/module/best-crop-result/best-crop-result.component';


const routes: Routes = [
  {
    path: '',
    component: LoadingComponent
  },
  {
    path: 'home',
    component: DefaultComponent,

    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'crop-prediction',
        component: CropPredictionComponent
      },
      {
        path: 'crop-prediction-result',
        component: CropPredictionResultComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'best-crop',
        component: BestCropComponent
      },
      {
        path: 'best-crop-result',
        component: BestCropResultComponent
      },
      {
        path: 'weather',
        component: WeatherPredictionComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'contact',
        component: ContactUsComponent
      },
      {
        path: 'news',
        component: NewsComponent
      }
    ]
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
