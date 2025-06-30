import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { APP_CONSTANTS } from '../utils/app.constants'; 
import { HttpClient } from '@angular/common/http';

/**
 * AuthResponse defines the structure of the response returned by the backend
 * after a successful signup or login.
 */

interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

/**
 * AuthService manages authentication state, user info, and token storage.
 * - Handles login, signup, and logout.
 * - Stores and retrieves user and token from localStorage.
 * - Exposes observables for login and admin status.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000';

  // BehaviorSubjects to track login and admin status
  private _isLoggedIn = new BehaviorSubject<boolean>(this.checkLogin());
  isLoggedIn$ = this._isLoggedIn.asObservable();

  private _isAdmin = new BehaviorSubject<boolean>(this.checkAdmin());
  isAdmin$ = this._isAdmin.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Checks if a user is logged in by looking for a user object in localStorage.
   */
  private checkLogin(): boolean {
    return !!localStorage.getItem('user');
  }

  /**
   * Checks if the current user is an admin by comparing their email to the admin email.
   */
  private checkAdmin(): boolean {
  const userStr = localStorage.getItem('user');
  if (!userStr || userStr === 'undefined') return false;

  try {
    const user = JSON.parse(userStr);
    return user?.email === APP_CONSTANTS.ADMIN_EMAIL;
  } catch {
    return false;
  }
}


  signup(name: string, email: string, password: string): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/signup`, { name, email, password });
}


  // signup(name: string, email: string, password: string): Observable<AuthResponse> {
  //   return this.http.post<AuthResponse>(`${this.apiUrl}/signup`, { name, email, password }).pipe(
  //   //   tap(response => {
  //   //     localStorage.setItem('token', response.token);
  //   //     localStorage.setItem('user', JSON.stringify(response.user));
  //   //     this._isLoggedIn.next(true);
  //   //     this._isAdmin.next(response.user.email === APP_CONSTANTS.ADMIN_EMAIL);
  //   //   })
  //   );
  // }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        this._isLoggedIn.next(true);
        this._isAdmin.next(response.user.email === APP_CONSTANTS.ADMIN_EMAIL);
      })
    );
  }

  /**
   * Logs out the user, clears localStorage, and resets authentication state.
   */
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this._isLoggedIn.next(false);
    this._isAdmin.next(false);
  }

getUserEmail(): string {
  const userStr = localStorage.getItem('user');
  if (!userStr || userStr === 'undefined') return '';

  try {
    const user = JSON.parse(userStr);
    return user?.email || '';
  } catch {
    return '';
  }
}

/**
   * Returns the authentication token from localStorage, or null if not present.
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Returns true if the user is currently logged in.
   */
  isLoggedIn(): boolean {
    return this._isLoggedIn.value;
  }

/**
   * Returns true if the current user is an admin.
   */
  isAdmin(): boolean {
    return this._isAdmin.value;
  }
}