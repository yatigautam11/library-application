import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { APP_CONSTANTS } from '../../../core/utils/app.constants'; 

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
      this.authService.login(this.email, this.password).subscribe({
        next: (response) => {
          console.log('JWT token:', response.token);
          this.matSnackBar.open(
            APP_CONSTANTS.MESSAGES.LOGIN_SUCCESS,
            'Close',
            {
              duration: APP_CONSTANTS.SNACKBAR_DURATION,
              panelClass: ['snack-success']
            }
          );
          this.router.navigate([APP_CONSTANTS.ROUTES.DASHBOARD]);
        },
        error: (err) => {
          this.matSnackBar.open(
            err.error?.message || APP_CONSTANTS.MESSAGES.LOGIN_ERROR,
            'Close',
            {
              duration: APP_CONSTANTS.SNACKBAR_DURATION,
              panelClass: ['snack-error']
            }
          );
        }
      });
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