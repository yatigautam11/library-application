import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { APP_CONSTANTS } from '../shared/constants/app.constants'; 

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private matSnackBar: MatSnackBar
  ) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      const success = this.authService.login(this.email, this.password);

      if (success) {
        this.matSnackBar.open(
          APP_CONSTANTS.MESSAGES.LOGIN_SUCCESS,
          'Close',
          {
            duration: APP_CONSTANTS.SNACKBAR_DURATION,
            panelClass: ['snack-success']
          }
        );
        this.router.navigate([APP_CONSTANTS.ROUTES.DASHBOARD]);
      } else {
        this.matSnackBar.open(
          APP_CONSTANTS.MESSAGES.LOGIN_ERROR,
          'Close',
          {
            duration: APP_CONSTANTS.SNACKBAR_DURATION,
            panelClass: ['snack-error']
          }
        );
      }
    } else {
      this.matSnackBar.open(
        APP_CONSTANTS.MESSAGES.SIGNUP_ERROR,
        'Close',
        {
          duration: APP_CONSTANTS.SNACKBAR_DURATION,
          panelClass: ['snack-invalid']
        }
      );
    }
  }
}
