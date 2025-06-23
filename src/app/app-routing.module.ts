import { LoginComponent } from "./login/login.component";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { SignupComponent } from "./signup/signup.component";
import { DashboardComponent } from "./features/dashboard/dashboard.component";
import { MyLibraryComponent } from "./features/my-library/my-library.component";
import { AdminGuard } from "./auth/auth.guard";
import { BookAdminComponent } from "./features/book-admin/book-admin.component";
import { PageNotFoundComponent } from "./shared/components/page-not-found/page-not-found.component";

const routes: Routes=[
     { path: '', redirectTo: 'login', pathMatch: 'full' }, // show login first
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  {path: 'my-library', component: MyLibraryComponent},
  { path: 'admin/books', component: BookAdminComponent, canActivate: [AdminGuard] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }