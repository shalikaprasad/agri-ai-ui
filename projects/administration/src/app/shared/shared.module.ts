import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from 'projects/administration/src/app/shared/components/header/header.component';
import {FooterComponent} from 'projects/administration/src/app/shared/components/footer/footer.component';
import {SectionComponent} from 'projects/administration/src/app/shared/components/section/section.component';
import {VendorsModule} from 'projects/vendors/src/lib/vendors.module';
import {RouterModule} from '@angular/router';
import { SidebarComponent } from 'projects/administration/src/app/shared/components/sidebar/sidebar.component';
import { DialogBoxComponent } from './widgets/dialog-box/dialog-box.component';
import { AreaComponent } from './widgets/area/area.component';
import { PieComponent } from './widgets/pie/pie.component';
import {FlexModule} from "@angular/flex-layout";


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SectionComponent,
    SidebarComponent,
    DialogBoxComponent,
    AreaComponent,
    PieComponent
  ],
    imports: [
        CommonModule,
        VendorsModule,
        RouterModule,
        FlexModule
    ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SectionComponent,
    SidebarComponent,
    DialogBoxComponent,
    AreaComponent,
    PieComponent
  ],
  entryComponents: [
    DialogBoxComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class SharedModule { }
