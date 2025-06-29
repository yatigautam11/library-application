import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { APP_CONSTANTS } from '../utils/app.constants'; 
import { HttpClient } from '@angular/common/http';

interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000';

  private _isLoggedIn = new BehaviorSubject<boolean>(this.checkLogin());
  isLoggedIn$ = this._isLoggedIn.asObservable();

  private _isAdmin = new BehaviorSubject<boolean>(this.checkAdmin());
  isAdmin$ = this._isAdmin.asObservable();

  constructor(private http: HttpClient) {}

  private checkLogin(): boolean {
    return !!localStorage.getItem('user');
  }

  private checkAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user?.email === APP_CONSTANTS.ADMIN_EMAIL;
  }

  signup(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/signup`, { email, password }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        this._isLoggedIn.next(true);
        this._isAdmin.next(response.user.email === APP_CONSTANTS.ADMIN_EMAIL);
      })
    );
  }

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

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this._isLoggedIn.next(false);
    this._isAdmin.next(false);
  }

getUserEmail(): string {
  // Return the logged-in user's email from your auth logic (token, user object, etc.)
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return user?.email || '';
}

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return this._isLoggedIn.value;
  }

  isAdmin(): boolean {
    return this._isAdmin.value;
  }
}