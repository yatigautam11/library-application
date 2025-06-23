import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Required for [(ngModel)]
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { MyLibraryComponent } from './features/my-library/my-library.component';
import { BookCardComponent } from './shared/components/book-card/book-card.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { BookAdminComponent } from './features/book-admin/book-admin.component';
import { NotesDialogBoxComponent } from './shared/components/notes-dialog-box/notes-dialog-box.component';

// ✅ Angular Material Modules (NgModules!)
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';        // For dialogs
import { MatButtonModule } from '@angular/material/button';        // For <button mat-button>
import { MatFormFieldModule } from '@angular/material/form-field'; // For <mat-form-field>
import { MatInputModule } from '@angular/material/input';          // For <input matInput>
import { MatCardModule } from '@angular/material/card';            // For <mat-card>
import { CommonModule } from '@angular/common';
import { BookFormDialogComponent } from './shared/components/book-form-dialog/book-form-dialog.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    MyLibraryComponent,
    BookCardComponent,
    NavbarComponent,
    BookAdminComponent,
    NotesDialogBoxComponent,
    BookFormDialogComponent,
    BookFormDialogComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    AppRoutingModule,
    // ✅ Angular Material modules
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule
  ],
  providers: [provideHttpClient(),
     {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
