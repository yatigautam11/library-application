import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { APP_CONSTANTS } from '../shared/constants/app.constants'; // Adjust path as necessary

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn = new BehaviorSubject<boolean>(this.checkLogin());
  isLoggedIn$ = this._isLoggedIn.asObservable();

  private _isAdmin = new BehaviorSubject<boolean>(this.checkAdmin());
  isAdmin$ = this._isAdmin.asObservable();

  constructor() {}

  private getUsers(): any[] {
    return JSON.parse(localStorage.getItem(APP_CONSTANTS.LOCAL_STORAGE_KEYS.USERS) || '[]');
  }

  private saveUsers(users: any[]): void {
    localStorage.setItem(APP_CONSTANTS.LOCAL_STORAGE_KEYS.USERS, JSON.stringify(users));
  }

  private checkLogin(): boolean {
    return !!localStorage.getItem(APP_CONSTANTS.LOCAL_STORAGE_KEYS.CURRENT_USER);
  }

  private checkAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem(APP_CONSTANTS.LOCAL_STORAGE_KEYS.CURRENT_USER) || '{}');
    return user?.email === APP_CONSTANTS.ADMIN_EMAIL;
  }

  signup(email: string, password: string): boolean {
    const users = this.getUsers();
    const exists = users.find(u => u.email === email);
    if (exists) return false;

    const isAdmin = email === APP_CONSTANTS.ADMIN_EMAIL;
    const newUser = { email, password, isAdmin };
    users.push(newUser);
    this.saveUsers(users);
    return true;
  }

  login(email: string, password: string): boolean {
    const users = this.getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return false;

    localStorage.setItem(APP_CONSTANTS.LOCAL_STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    this._isLoggedIn.next(true);
    this._isAdmin.next(user.email === APP_CONSTANTS.ADMIN_EMAIL);
    return true;
  }

  logout(): void {
    localStorage.removeItem(APP_CONSTANTS.LOCAL_STORAGE_KEYS.CURRENT_USER);
    this._isLoggedIn.next(false);
    this._isAdmin.next(false);
  }

  isLoggedIn(): boolean {
    return this._isLoggedIn.value;
  }

  isAdmin(): boolean {
    return this._isAdmin.value;
  }
}



