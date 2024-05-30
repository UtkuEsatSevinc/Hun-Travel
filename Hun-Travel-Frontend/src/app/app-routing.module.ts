import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './component/login-page/login-page.component';
import { SignUpPageComponent } from './component/sign-up-page/sign-up-page.component';
import { TicketPageComponent } from './component/ticket-page/ticket-page.component';
import { PayPageComponent } from './component/pay-page/pay-page.component';
import { AdminPageComponent } from './component/admin-page/admin-page.component';
import { DriverPageComponent } from './component/driver-page/driver-page.component';
import { CustomerProfilePageComponent } from './component/customer-profile-page/customer-profile-page.component';
import { HomePageComponent } from './component/home-page/home-page.component';
import { AnasayfaPageComponent } from './component/anasayfa-page/anasayfa-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'signUp', component: SignUpPageComponent },
  { path: 'ticket', component: TicketPageComponent },
  { path: 'customer-profile', component: CustomerProfilePageComponent },
  { path: 'pay', component: PayPageComponent },
  { path: 'admin', component: AdminPageComponent },
  { path: 'driver', component: DriverPageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'anasayfa', component: AnasayfaPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
