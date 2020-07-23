import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {DashboardComponent} from 'projects/administration/src/app/module/officer/dashboard/dashboard.component';
import {CreateProjectComponent} from 'projects/administration/src/app/module/officer/create-project/create-project.component';
import {CreateOfficerComponent} from 'projects/administration/src/app/module/admin/create-officer/create-officer.component';
import {HomeComponent} from 'projects/administration/src/app/module/admin/home/home.component';
import {CreateNewsComponent} from 'projects/administration/src/app/module/admin/create-news/create-news.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from 'projects/administration/src/app/shared/shared.module';
import {VendorsModule} from 'projects/vendors/src/lib/vendors.module';
import {DefaultComponent} from 'projects/administration/src/app/layout/default/default.component';
import {CreateFarmerComponent} from 'projects/administration/src/app/module/officer/create-farmer/create-farmer.component';
import {AppComponent} from 'projects/administration/src/app/app.component';
import {GroupChattingComponent} from 'projects/administration/src/app/module/common/group-chatting/group-chatting.component';
import {ProjectStatusComponent} from 'projects/administration/src/app/module/common/project-status/project-status.component';
import {ProjectAnalysisComponent} from 'projects/administration/src/app/module/common/project-analysis/project-analysis.component';
import {UpdateOfficerComponent} from 'projects/administration/src/app/module/admin/update-officer/update-officer.component';
import {HelpComponent} from 'projects/administration/src/app/module/common/help/help.component';
import {ProfileComponent} from 'projects/administration/src/app/module/admin/profile/profile.component';
import {UpdateFarmerComponent} from 'projects/administration/src/app/module/officer/update-farmer/update-farmer.component';
import {UpdateProjectComponent} from 'projects/administration/src/app/module/officer/update-project/update-project.component';
import {PriceDetailsComponent} from 'projects/administration/src/app/module/admin/price-details/price-details.component';
import {NoPageFoundComponent} from 'projects/administration/src/app/module/common/no-page-found/no-page-found.component';
import {UpdateProfileComponent} from 'projects/administration/src/app/module/admin/update-profile/update-profile.component';
import {UpdateNewsComponent} from 'projects/administration/src/app/module/admin/update-news/update-news.component';
import {UpdatePriceComponent} from 'projects/administration/src/app/module/admin/update-price/update-price.component';
import {ProjectListComponent} from 'projects/administration/src/app/module/officer/project-list/project-list.component';


@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    CreateProjectComponent,
    CreateOfficerComponent,
    HomeComponent,
    CreateNewsComponent,
    CreateFarmerComponent,
    GroupChattingComponent,
    ProjectStatusComponent,
    ProjectAnalysisComponent,
    UpdateOfficerComponent,
    HelpComponent,
    ProfileComponent,
    UpdateFarmerComponent,
    UpdateProjectComponent,
    PriceDetailsComponent,
    NoPageFoundComponent,
    UpdateProfileComponent,
    UpdateNewsComponent,
    UpdatePriceComponent,
    ProjectListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    VendorsModule
  ],
  providers: [
    DatePipe
  ],
  schemas: [
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA
]
})
export class DefaultModule { }
