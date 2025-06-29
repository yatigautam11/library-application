import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';  // Adjust path as needed
import { MatSnackBar } from '@angular/material/snack-bar';
import { APP_CONSTANTS } from '../utils/app.constants';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private snackbar:MatSnackBar) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn() && !this.authService.isAdmin()) {
      return true;
    }

    // Show snackbar and redirect
    this.snackbar.open(APP_CONSTANTS.MESSAGES.ACCESS_DENIED, 'Close', {
      duration: APP_CONSTANTS.SNACKBAR_DURATION
    });

    // Redirect to dashboard based on role
    this.router.navigate(['/dashboard']);
    return false;
  }
}
