import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8089/api/auth';
  private userRole: string | null = null;

  constructor(private http: HttpClient) {
    // Initialize userRole from localStorage
    this.userRole = localStorage.getItem('userRole');
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password }).pipe(
      tap((response: any) => {
        this.userRole = response.role;
        localStorage.setItem('userRole', this.userRole as string);
        localStorage.setItem('authToken', response.token);
      })
    );
  }

  logout(): Observable<any> {
    return this.http.get(`${this.apiUrl}/logout`).pipe(
      tap(() => {
        localStorage.removeItem('userRole');
        localStorage.removeItem('authToken');
        this.userRole = null;
      })
    );
  }

  getRole(): string | null {
    return this.userRole;
  }

  isLoggedIn(): boolean {
    return this.userRole !== null && this.userRole !== undefined;
  }

  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  isAdmin(): boolean {
    return this.userRole === 'ADMIN';
  }

  isAgent(): boolean {
    return this.userRole === 'AGENT';
  }

  isClient(): boolean {
    return this.userRole === 'CLIENT';
  }

  isFirstLogin(): boolean {
    try {
      return JSON.parse(localStorage.getItem('firstLogin') || 'false');
    } catch {
      return false;
    }
  }

  completeFirstLogin(): void {
    localStorage.setItem('firstLogin', 'false');
  }
}
