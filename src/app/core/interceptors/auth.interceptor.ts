import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { APP_CONSTANTS } from '../../shared/constants/app.constants'; // adjust path as needed

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private snackBar: MatSnackBar) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.snackBar.open(APP_CONSTANTS.MESSAGES.UNAUTHORIZED, 'Close', {
            duration: APP_CONSTANTS.SNACKBAR_DURATION
          });
          this.router.navigate([APP_CONSTANTS.ROUTES.LOGIN]);
        } else if (error.status === 403) {
          this.snackBar.open(APP_CONSTANTS.MESSAGES.FORBIDDEN, 'Close', {
            duration: APP_CONSTANTS.SNACKBAR_DURATION
          });
        } else if (error.status === 500) {
          this.snackBar.open(APP_CONSTANTS.MESSAGES.SERVER_ERROR, 'Close', {
            duration: APP_CONSTANTS.SNACKBAR_DURATION
          });
        }

        return throwError(() => error);
      })
    );
  }
}
