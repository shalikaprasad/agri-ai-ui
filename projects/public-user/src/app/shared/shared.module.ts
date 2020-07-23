import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from 'projects/public-user/src/app/shared/components/header/header.component';
import {FooterComponent} from 'projects/public-user/src/app/shared/components/footer/footer.component';
import {SectionComponent} from 'projects/public-user/src/app/shared/components/section/section.component';
import {VendorsModule} from 'projects/vendors/src/lib/vendors.module';
import {RouterModule} from '@angular/router';
import { DialogBoxComponent } from './components/dialog-box/dialog-box.component';
import { ProjectBarComponent } from './components/project-bar/project-bar.component';
import { NewsBarComponent } from './components/news-bar/news-bar.component';
import { ContactBarComponent } from './components/contact-bar/contact-bar.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SectionComponent,
    DialogBoxComponent,
    ProjectBarComponent,
    NewsBarComponent,
    ContactBarComponent
  ],
  imports: [
    CommonModule,
    VendorsModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SectionComponent,
    ProjectBarComponent,
    NewsBarComponent,
    ContactBarComponent
  ]
})
export class SharedModule { }
