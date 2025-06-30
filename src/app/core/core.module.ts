import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthService } from './services/auth.service';
import { BookService } from './services/books.service';
import { UserServiceService } from './services/user-service.service';
import { BookAdminService } from './services/book-admin.service';

import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AdminGuard } from './guards/auth.guard';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { JwtInterceptor } from './interceptors/jwt.interceptor';

/**
 * CoreModule is a singleton module that provides core services, guards, and interceptors
 * for the entire application. It should only be imported in AppModule.
 */
@NgModule({
  imports: [
    CommonModule, //provides common directives like ngIf, ngFor
    MatSnackBarModule,// provides Material Snackbar for notifications
    HttpClientModule // enables HTTP client features for making API calls
  ],
  providers: [
    AuthService, // provides authentication services
    BookService, // provides book-related services
    UserServiceService, // manages user notes and summaries
    BookAdminService, // provides admin-specific book management services
    AdminGuard, // guard to protect admin routes
    {
      provide: HTTP_INTERCEPTORS, // intercepts HTTP requests to add authentication headers
      useClass: AuthInterceptor, // AuthInterceptor adds auth token to requests
      multi: true //
    },
    {provide: HTTP_INTERCEPTORS, useClass:JwtInterceptor, // adds JWT token to requests
       multi:true},
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: { verticalPosition: 'top', horizontalPosition: 'center' }
    }
  ]
})
export class CoreModule {
  // Prevents re-import of CoreModule
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in AppModule only.');
    }
  }
}
