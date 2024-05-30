import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './component/login-page/login-page.component';
import { SignUpPageComponent } from './component/sign-up-page/sign-up-page.component';
import { TicketPageComponent } from './component/ticket-page/ticket-page.component';
import { CustomerProfilePageComponent } from './component/customer-profile-page/customer-profile-page.component';
import { AdminPageComponent } from './component/admin-page/admin-page.component';
import { DriverPageComponent } from './component/driver-page/driver-page.component';
import { TicketComponent } from './component/ticket-page/ticket/ticket.component';
import { BiletFilterPipe } from './component/ticket-page/ticket/bilet-filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePageComponent } from './component/home-page/home-page.component';
import { AnasayfaPageComponent } from './component/anasayfa-page/anasayfa-page.component';
import { PayPageComponent } from './component/pay-page/pay-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    SignUpPageComponent,
    TicketPageComponent,
    CustomerProfilePageComponent,
    PayPageComponent,
    AdminPageComponent,
    DriverPageComponent,
    TicketComponent,
    BiletFilterPipe,
    HomePageComponent,
    AnasayfaPageComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
