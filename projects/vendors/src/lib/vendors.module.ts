import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { VendorsComponent } from './vendors.component';
import {
  MatButtonModule,
  MatDialogModule, MatDividerModule,
  MatIconModule,
  MatListModule, MatPaginatorModule,
  MatSelectModule,
  MatSidenavModule, MatSnackBarModule, MatTableModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {OAuthModule} from 'angular-oauth2-oidc';
import {TreeViewModule} from '@syncfusion/ej2-angular-navigations';
import {ConfirmationPopoverModule} from 'angular-confirmation-popover';
import {HighchartsChartModule} from 'highcharts-angular';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [VendorsComponent],
  imports: [
    MatButtonModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MatSidenavModule,
    MatDividerModule,
    TranslateModule,
    FormsModule,
    OAuthModule.forRoot(),
    TreeViewModule,
    MatSelectModule,
    MatIconModule,
    MatListModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger' // set defaults here
    }),
    MatDialogModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatTableModule,
    HighchartsChartModule
  ],
  exports: [
    VendorsComponent,
    MatButtonModule,
    ReactiveFormsModule,
    MDBBootstrapModule,
    HttpClientModule,
    MatSidenavModule,
    MatDividerModule,
    TranslateModule,
    FormsModule,
    OAuthModule,
    TreeViewModule,
    MatSelectModule,
    MatIconModule,
    MatListModule,
    ConfirmationPopoverModule,
    MatDialogModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatTableModule,
    HighchartsChartModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA ]
})
export class VendorsModule { }
