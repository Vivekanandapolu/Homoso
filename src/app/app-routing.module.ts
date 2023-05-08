import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Authentication/login/login.component';
import { ForgotComponentComponent } from '../app/Authentication/forgot-component/forgot-component.component';
import { GeneratePasswordComponent } from './Authentication/generate-password/generate-password.component';
import { HeaderComponent } from './Authentication/header/header.component';
import { TenantsComponent } from './Home/tenants/tenants.component';
import { BedStatusComponent } from './Home/tenants/bed-status/bed-status.component';
import { SettingsComponent } from './Home/settings/settings.component';
import { CompaniesComponent } from './Home/settings/companies/companies.component';
import { HostelsComponent } from './Home/settings/hostels/hostels.component';
import { AuthGuardGuard } from './auth-guard.guard';
import { UserdetailsComponent } from './Home/settings/userdetails/userdetails.component';
import { RoomsComponent } from './Home/settings/rooms/rooms.component';
import { RoomTypesComponent } from './Home/settings/room-types/room-types.component';
import { RoomRatesComponent } from './Home/settings/room-rates/room-rates.component';

const routes: Routes = [

  {
    path: '',
    component: LoginComponent,

  },
  {
    path: 'forgot_password',
    component: ForgotComponentComponent
  },
  {
    path: 'forgot_password/generate_password',
    component: GeneratePasswordComponent
  },
  {
    path: 'dashboard',
    component: HeaderComponent,
    canActivate: [AuthGuardGuard]
  }, {
    path: 'tenants',
    component: TenantsComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'tenants/bedstatus',
    component: BedStatusComponent,
    canActivate: [AuthGuardGuard]

  },
  {
    path: 'settings', component: SettingsComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'settings/companies',
    component: CompaniesComponent,
    canActivate: [AuthGuardGuard]

  },
  {
    path: 'settings/hostels',
    component: HostelsComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: "settings/user-details",
    component: UserdetailsComponent,
    canActivate: [AuthGuardGuard]
  }, {
    path: 'settings/rooms',
    component: RoomsComponent,
    canActivate: [AuthGuardGuard]
  }, {
    path: 'settings/room_rates',
    component: RoomTypesComponent,
    canActivate: [AuthGuardGuard]
  }, {
    path: 'settings/room_types',
    component: RoomRatesComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: '**',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
