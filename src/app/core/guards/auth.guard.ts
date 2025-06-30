import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { APP_CONSTANTS } from '../utils/app.constants';

/**
 * AdminGuard is an Angular route guard that restricts access to admin-only routes.
 * It checks if the user is logged in and if their email matches the admin email.
 * If not, it redirects the user to the dashboard and shows a forbidden message.
 */
@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  // Inject AuthService to check login status and Router for navigation
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Determines if the route can be activated.
   * Returns true if the user is logged in and is the admin.
   * Otherwise, shows an alert and redirects to the dashboard.
   */
  canActivate(): boolean {
    // Retrieve the current user from local storage
    const user = JSON.parse(localStorage.getItem(APP_CONSTANTS.LOCAL_STORAGE_KEYS.CURRENT_USER) || '{}');

    // Check if user is logged in and is the admin
    if (this.authService.isLoggedIn() && this.authService.isAdmin()) {
      return true;  
    } else {
      // Show forbidden message and redirect to dashboard
      alert(APP_CONSTANTS.MESSAGES.FORBIDDEN);
      this.router.navigate([APP_CONSTANTS.ROUTES.DASHBOARD]);
      return false;
    }
  }
}
