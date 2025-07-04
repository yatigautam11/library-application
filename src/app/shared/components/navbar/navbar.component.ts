import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { APP_CONSTANTS } from '../../../core/utils/app.constants'; 
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';

// NavbarComponent provides the main navigation bar for the application.
// It includes links to various sections of the app and handles user authentication state.
@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isAdmin = false;
  isLoggedIn = false;

  showPremiumSuccess = false;

  // Template reference for the premium dialog
  // This allows us to open the dialog programmatically.
  @ViewChild('premiumDialog') premiumDialog!: TemplateRef<any>;

  private destroy$ = new Subject<void>();
  
  // The constructor injects the necessary services for routing, authentication, search functionality, and dialog management.
  // It also subscribes to the authentication service to update the admin and logged-in states.
  constructor(private router: Router, private authService: AuthService, private dialog: MatDialog) {
    this.authService.isAdmin$
    .pipe(takeUntil(this.destroy$))
    .subscribe(admin => this.isAdmin = admin);
    this.authService.isLoggedIn$
     .pipe(takeUntil(this.destroy$))  
      .subscribe(loggedIn => this.isLoggedIn = loggedIn);

    //  Immediately trigger status (if page was reloaded)
  this.isLoggedIn = this.authService.isLoggedIn();
  this.isAdmin = this.authService.isAdmin();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  goToPremium() {
  this.router.navigate(['/premium']);
}

//
  logout() {
    this.authService.logout();
    this.router.navigate([APP_CONSTANTS.ROUTES.LOGIN]); // Redirect using constant
  }
}
