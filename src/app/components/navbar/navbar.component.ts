import { Component } from '@angular/core';
import { MockAuthService } from '../../services/mock-auth.service'; // Update path as needed
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class NavbarComponent {
  constructor(private authService: MockAuthService, private router: Router) {}
  

  isLoggedIn(): boolean {
    // console.log('Logged in status:', this.authService.isLoggedIn());
    return this.authService.isLoggedIn();
  }

  isLoggedOut(): boolean {
    return this.authService.isLoggedOut();
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  isAgent(): boolean {
    return this.authService.isAgent();
  }

  isClient(): boolean {
    return this.authService.isClient();
  }

  // Logout method: Removes authentication data and redirects
  logout(): void {
    this.authService.logout()
      .pipe(
        finalize(() => {
          window.location.href = '/about'; // Force a full page reload and navigation
        })
      )
      .subscribe({
        next: () => {
          console.log('Logout successful');
        },
        error: (error) => {
          console.error('Logout error:', error);
        }
      });
  }
}
