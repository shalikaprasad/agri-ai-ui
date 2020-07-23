import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from 'projects/administration/src/app/module/officer/dashboard/dashboard.component';
import {CreateProjectComponent} from 'projects/administration/src/app/module/officer/create-project/create-project.component';
import {CreateOfficerComponent} from 'projects/administration/src/app/module/admin/create-officer/create-officer.component';
import {CreateNewsComponent} from 'projects/administration/src/app/module/admin/create-news/create-news.component';
import {LoadingComponent} from 'projects/administration/src/app/module/loading/loading.component';
import {LoginComponent} from 'projects/administration/src/app/module/login/login.component';
import {DefaultComponent} from 'projects/administration/src/app/layout/default/default.component';
import {UpdateOfficerComponent} from 'projects/administration/src/app/module/admin/update-officer/update-officer.component';
import {CreateFarmerComponent} from 'projects/administration/src/app/module/officer/create-farmer/create-farmer.component';
import {UpdateFarmerComponent} from 'projects/administration/src/app/module/officer/update-farmer/update-farmer.component';
import {UpdateProjectComponent} from 'projects/administration/src/app/module/officer/update-project/update-project.component';
import {ProjectAnalysisComponent} from 'projects/administration/src/app/module/common/project-analysis/project-analysis.component';
import {GroupChattingComponent} from 'projects/administration/src/app/module/common/group-chatting/group-chatting.component';
import {HelpComponent} from 'projects/administration/src/app/module/common/help/help.component';
import {PriceDetailsComponent} from 'projects/administration/src/app/module/admin/price-details/price-details.component';
import {ProjectStatusComponent} from 'projects/administration/src/app/module/common/project-status/project-status.component';
import {NoPageFoundComponent} from 'projects/administration/src/app/module/common/no-page-found/no-page-found.component';
import {ProfileComponent} from 'projects/administration/src/app/module/admin/profile/profile.component';
import {UpdateProfileComponent} from 'projects/administration/src/app/module/admin/update-profile/update-profile.component';
import {UpdateNewsComponent} from 'projects/administration/src/app/module/admin/update-news/update-news.component';
import {UpdatePriceComponent} from 'projects/administration/src/app/module/admin/update-price/update-price.component';
import {ProjectListComponent} from 'projects/administration/src/app/module/officer/project-list/project-list.component';

const routes: Routes = [
  {
    path: '',
    component: LoadingComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DefaultComponent,

    children: [
      {
        path: 'home',
        component: ProjectAnalysisComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'update-profile',
        component: UpdateProfileComponent
      },
      {
        path: 'update-profile/:id',
        component: UpdateProfileComponent
      },
      {
        path: 'create-project',
        component: CreateProjectComponent
      },
      {
        path: 'create-project/:id',
        component: CreateProjectComponent
      },
      {
        path: 'project-list/:id',
        component: ProjectListComponent
      },
      {
        path: 'update-project',
        component: UpdateProjectComponent
      },
      {
        path: 'create-officer',
        component: CreateOfficerComponent
      },
      {
        path: 'update-officer',
        component: UpdateOfficerComponent
      },
      {
        path: 'create-farmer',
        component: CreateFarmerComponent
      },
      {
        path: 'update-farmer',
        component: UpdateFarmerComponent
      },
      {
        path: 'update-farmer/:id',
        component: UpdateFarmerComponent
      },
      {
        path: 'price-details',
        component: PriceDetailsComponent
      },
      {
        path: 'update-price',
        component: UpdatePriceComponent
      },
      {
        path: 'update-price/:id',
        component: UpdatePriceComponent
      },
      {
        path: 'news',
        component: CreateNewsComponent
      },
      {
        path: 'update-news',
        component: UpdateNewsComponent
      },
      {
        path: 'update-news/:id',
        component: UpdateNewsComponent
      },
      {
        path: 'project-status',
        component: ProjectStatusComponent
      },
      {
        path: 'group-chatting',
        component: GroupChattingComponent
      },
      {
        path: 'help',
        component: HelpComponent
      },
      { path: '**',
        component: NoPageFoundComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  schemas: [
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA
]
})
export class AppRoutingModule { }
