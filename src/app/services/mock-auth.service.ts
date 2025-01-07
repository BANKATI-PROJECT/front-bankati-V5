import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface LoginResponse {
  role: string;
  token: string;
  responseType: string;
}

@Injectable({
  providedIn: 'root',
})
export class MockAuthService {
  private mockRole: string | null = null;
  private mockToken: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQURNSU4ifQ.VRYPXofMEQ0kcIzz0B2gBrsp0hZjtkxVt9s3OD2u9Eo';

  constructor() {
    // Initialize state from localStorage on service creation
    this.mockRole = localStorage.getItem('userRole');
  }

  login(username: string, password: string): Observable<LoginResponse | null> {
    let mockRole: string | null = null;

    if (username === 'admin' && password === 'admin123') {
      mockRole = 'ADMIN';
    } else if (username === 'agent' && password === 'agent123') {
      mockRole = 'AGENT';
    } else if (username === 'client' && password === 'client123') {
      mockRole = 'CLIENT';
    } else {
      return of(null);
    }

    const mockResponse: LoginResponse = {
      role: mockRole,
      token: this.mockToken,
      responseType: 'redirect'
    };

    return of(mockResponse).pipe(
      tap(response => {
        // Store data in localStorage
        localStorage.setItem('userRole', mockRole!);
        localStorage.setItem('token', this.mockToken); // Changed from 'authToken' to 'token'
        
        // Update internal state
        this.mockRole = mockRole;
      })
    );
  }

  logout(): Observable<void> {
    return of(void 0).pipe(
      tap(() => {
        // Clear all auth-related data
        localStorage.removeItem('userRole');
        localStorage.removeItem('token');
        localStorage.removeItem('attemptedUrl');
        localStorage.removeItem('firstLogin');
        
        // Reset internal state
        this.mockRole = null;
      })
    );
  }

  getRole(): string | null {
    return localStorage.getItem('userRole');
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    const role = this.getRole();
    return !!(token && role);
  }

  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }

  isAgent(): boolean {
    return this.getRole() === 'AGENT';
  }

  isClient(): boolean {
    return this.getRole() === 'CLIENT';
  }

  isFirstLogin(): boolean {
    return localStorage.getItem('firstLogin') !== 'false';
  }

  completeFirstLogin(): void {
    localStorage.setItem('firstLogin', 'false');
  }
}