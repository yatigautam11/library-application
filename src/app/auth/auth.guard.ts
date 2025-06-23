import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { APP_CONSTANTS } from '../shared/constants/app.constants';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const user = JSON.parse(localStorage.getItem(APP_CONSTANTS.LOCAL_STORAGE_KEYS.CURRENT_USER) || '{}');

    if (this.authService.isLoggedIn() && user.email === APP_CONSTANTS.ADMIN_EMAIL) {
      return true;  
    } else {
      alert(APP_CONSTANTS.MESSAGES.FORBIDDEN);
      this.router.navigate([APP_CONSTANTS.ROUTES.DASHBOARD]);
      return false;
    }
  }
}
