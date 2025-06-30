import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PremiumComponent } from './premium/premium.component';

// HomeRoutingModule defines the routes for the Home feature module.
// It includes routes for the dashboard and premium components.
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'premium',
    component: PremiumComponent
  }
];

//
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
