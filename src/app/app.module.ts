
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ForgotComponentComponent } from './Authentication/forgot-component/forgot-component.component';

import { GeneratePasswordComponent } from './Authentication/generate-password/generate-password.component';
import { HeaderComponent } from '../app/Authentication/header/header.component';
import { TenantsComponent } from './Home/tenants/tenants.component';
import { BedStatusComponent } from './Home/tenants/bed-status/bed-status.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, NgSelectOption } from '@angular/forms';
import { NgbModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SettingsComponent } from './Home/settings/settings.component';
import { CompaniesComponent } from './Home/settings/companies/companies.component';
import { HeaderInterceptorInterceptor } from './header-interceptor.interceptor';
import { HostelsComponent } from './Home/settings/hostels/hostels.component';
import { LoginComponent } from './Authentication/login/login.component';
import { AuthGuardGuard } from './auth-guard.guard';
import { UserdetailsComponent } from './Home/settings/userdetails/userdetails.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgSelectModule } from '@ng-select/ng-select';
import { RoomsComponent } from './Home/settings/rooms/rooms.component';
import { RoomTypesComponent } from './Home/settings/room-types/room-types.component';
import { RoomRatesComponent } from './Home/settings/room-rates/room-rates.component'
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    ForgotComponentComponent,
    GeneratePasswordComponent,
    HeaderComponent,
    LoginComponent,
    TenantsComponent,
    BedStatusComponent,
    SettingsComponent,
    CompaniesComponent,
    HostelsComponent,
    UserdetailsComponent,
    RoomsComponent,
    RoomTypesComponent,
    RoomRatesComponent,
  ],
  imports: [
    NgMultiSelectDropDownModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    NgbToastModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgSelectModule,
    RouterModule.forRoot([])

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptorInterceptor, multi: true
    }, AuthGuardGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {

  }
}
