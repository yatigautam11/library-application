import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { SharedModule } from '../../shared/shared.module';
import { PremiumComponent } from './premium/premium.component';
import { FormsModule } from '@angular/forms';
import { GooglePayButtonModule } from '@google-pay/button-angular';

@NgModule({
  declarations: [
    DashboardComponent,
    PremiumComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    FormsModule,
    GooglePayButtonModule
  ]
})
export class HomeModule { }
