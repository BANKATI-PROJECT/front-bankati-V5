import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://5ed8-105-71-135-223.ngrok-free.app/auth'; // Utilise la Gateway URL
  private userRole: string | null = null;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password }).pipe(
      tap((response: any) => {
        this.userRole = response.role;
        localStorage.setItem('userRole', this.userRole as string);
        localStorage.setItem('authToken', response.token);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('userRole');
    localStorage.removeItem('authToken');
    this.userRole = null;
  }

  getRole(): string | null {
    return localStorage.getItem('userRole');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }

  isClient(): boolean {
    return this.getRole() === 'CLIENT';
  }

  isAgent(): boolean {
    return this.getRole() === 'AGENT';
  }
}
