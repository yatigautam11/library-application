import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

// SignupComponent provides the signup interface for new users.
// It allows users to enter their name, email, password, and confirm password to create a
@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm: FormGroup;
  showPassword = false;
  showConfirmPassword = false;

  // Inject FormBuilder, AuthService, Router, and MatSnackBar for form management, authentication, navigation, and UI feedback.
  // The form includes fields for name, email, password, and confirm password with validation.
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private matSnackBar: MatSnackBar
  ) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  // Custom validator to check if password and confirmPassword match.
  passwordMatchValidator(group: AbstractControl): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  // onSubmit is called when the signup form is submitted.
  onSubmit(): void {
    if (this.signupForm.invalid) {
      this.matSnackBar.open('Please fix the form errors.', 'Close', {
        duration: 3000,
        panelClass: ['snackbar-error']
      });
      return;
    }

    const { name, email, password } = this.signupForm.value;
    this.authService.signup(name, email, password).subscribe({
      next: () => {
        this.matSnackBar.open('Successfully signed up!', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.matSnackBar.open(
          err.error?.message || 'Signup failed. Please try again.',
          'Close',
          { duration: 3000, panelClass: ['snackbar-error'] }
        );
      }
    });
  }

  // Toggle password visibility for the password and confirm password fields.
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  // Toggle confirm password visibility for the confirm password field.
  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  // Getters for form controls to simplify template access.
  // These provide easy access to the form controls in the template.
  get name() {
    return this.signupForm.get('name');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get confirmPassword() {
    return this.signupForm.get('confirmPassword');
  }
}