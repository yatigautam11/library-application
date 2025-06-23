import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({   
  selector: 'app-signup',
  standalone : false,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router, private matSnackBar: MatSnackBar) {}

  onSubmit() {
  if (this.email && this.password) {
    const success = this.authService.signup(this.email, this.password);

    if (!success) {
      this.matSnackBar.open('User already exists. Please login.', 'Close', {
        duration: 3000,
        panelClass: ['snackbar-error']
      });
      return;
    }

    this.matSnackBar.open('Successfully signed up!', 'Close', {
      duration: 3000,
      panelClass: ['snacker-success']
    });
    this.router.navigate(['/login']);
  } else {
    this.matSnackBar.open('Please fill all the details properly', 'Close', {
      duration: 3000,
      panelClass: ['snackbar-error']
    });
  }
}
}