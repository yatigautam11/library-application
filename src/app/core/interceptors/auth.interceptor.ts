import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { APP_CONSTANTS } from '../utils/app.constants';

/**
 * AuthInterceptor intercepts all HTTP requests and handles errors globally.
 * - Shows user-friendly error messages using MatSnackBar.
 * - Redirects to login on 401 Unauthorized.
 * - Handles common HTTP error statuses (0, 401, 403, 404, 500).
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private snackBar: MatSnackBar) {}

  /**
   * Intercepts HTTP requests and handles errors.
   * @param req The outgoing HTTP request.
   * @param next The next interceptor in the chain.
   * @returns Observable of the HTTP event stream.
   */

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // Try to extract a server error message, fallback to generic if not found
        let serverMessage = error.error?.error || error.error?.message || null;

        // Define fallback message
        let fallbackMessage = APP_CONSTANTS.MESSAGES.GENERIC_ERROR;

        // Handle different HTTP error statuses
        switch (error.status) {
          case 0:
            // Network/server unreachable
            serverMessage = 'Unable to connect to the server. Please check your internet connection.';
            break;

          case 401:
            // Unauthorized: redirect to login
            serverMessage ||= APP_CONSTANTS.MESSAGES.UNAUTHORIZED;
            this.router.navigate([APP_CONSTANTS.ROUTES.LOGIN]);
            break;

          case 403:
            // Forbidden
            serverMessage ||= APP_CONSTANTS.MESSAGES.FORBIDDEN;
            break;

          case 404:
            // Not found
            serverMessage ||= APP_CONSTANTS.MESSAGES.NOT_FOUND;
            break;

          case 500:
            // Internal server error
            serverMessage ||= APP_CONSTANTS.MESSAGES.SERVER_ERROR;
            break;

          default:
             // Any other error
            serverMessage ||= fallbackMessage;
            break;
        }

        // Show message in snack bar
        this.snackBar.open(serverMessage, 'Close', {
          duration: APP_CONSTANTS.SNACKBAR_DURATION
        });

         // Pass the error to the next handler
        return throwError(() => error);
      })
    );
  }
}
