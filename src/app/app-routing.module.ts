import { LoginComponent } from "../app/features/auth/login/login.component";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { SignupComponent } from "../app/features/auth/signup/signup.component";
import { DashboardComponent } from "./features/home/dashboard/dashboard.component";
import { MyLibraryComponent } from "./features/library/my-library/my-library.component";
import { BookAdminComponent } from "./features/admin/book-admin/book-admin.component";
import { PageNotFoundComponent } from "./shared/components/page-not-found/page-not-found.component";
import {AdminGuard} from "../app/core/guards/auth.guard"
import { UserGuard } from "./core/guards/user.guard";

const routes: Routes=[
     { path: '', redirectTo: 'login', pathMatch: 'full' }, // show login first
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)
  },
  {
  path: 'dashboard',
  loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)
},
  {
  path: 'my-library',
  canActivate: [UserGuard], // Only allow regular users
  loadChildren: () => import('./features/library/library.module').then(m => m.LibraryModule)
},
{
  path: 'admin',
  loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule),
  canActivate: [AdminGuard]
},

  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }