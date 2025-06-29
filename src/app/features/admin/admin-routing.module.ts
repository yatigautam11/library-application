import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookAdminComponent } from './book-admin/book-admin.component';

const routes: Routes = [
  {
    path: 'books',
    component: BookAdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
