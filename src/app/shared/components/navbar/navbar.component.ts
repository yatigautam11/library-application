import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { APP_CONSTANTS } from '../../../shared/constants/app.constants'; 

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isAdmin = false;
  isLoggedIn = false;

  constructor(private router: Router, private authService: AuthService) {
    this.authService.isAdmin$.subscribe(admin => this.isAdmin = admin);
    this.authService.isLoggedIn$.subscribe(loggedIn => this.isLoggedIn = loggedIn);

    // 🔁 Immediately trigger status (if page was reloaded)
  this.isLoggedIn = this.authService.isLoggedIn();
  this.isAdmin = this.authService.isAdmin();
  }

  logout() {
    this.authService.logout();
    this.router.navigate([APP_CONSTANTS.ROUTES.LOGIN]); // Redirect using constant
  }
}
