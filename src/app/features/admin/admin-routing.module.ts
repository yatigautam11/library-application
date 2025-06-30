import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookAdminComponent } from './book-admin/book-admin.component';

// AdminRoutingModule defines the routes for the admin feature module.
// It includes a route for managing books through the BookAdminComponent.
const routes: Routes = [
  {
    path: 'books',
    component: BookAdminComponent // BookAdminComponent provides the admin interface for managing books.
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
