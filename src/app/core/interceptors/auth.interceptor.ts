import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { APP_CONSTANTS } from '../utils/app.constants';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private snackBar: MatSnackBar) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let serverMessage = error.error?.error || error.error?.message || null;

        // Define fallback message
        let fallbackMessage = APP_CONSTANTS.MESSAGES.GENERIC_ERROR;

        switch (error.status) {
          case 0:
            serverMessage = 'Unable to connect to the server. Please check your internet connection.';
            break;

          case 401:
            serverMessage ||= APP_CONSTANTS.MESSAGES.UNAUTHORIZED;
            this.router.navigate([APP_CONSTANTS.ROUTES.LOGIN]);
            break;

          case 403:
            serverMessage ||= APP_CONSTANTS.MESSAGES.FORBIDDEN;
            break;

          case 404:
            serverMessage ||= APP_CONSTANTS.MESSAGES.NOT_FOUND;
            break;

          case 500:
            serverMessage ||= APP_CONSTANTS.MESSAGES.SERVER_ERROR;
            break;

          default:
            serverMessage ||= fallbackMessage;
            break;
        }

        // Show message in snack bar
        this.snackBar.open(serverMessage, 'Close', {
          duration: APP_CONSTANTS.SNACKBAR_DURATION
        });

        return throwError(() => error);
      })
    );
  }
}
