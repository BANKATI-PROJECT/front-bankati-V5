import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

// Define valid role types
type UserRole = 'CLIENT' | 'ADMIN' | 'AGENT';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.css']
})
export class UnauthorizedComponent implements OnInit {
  private previousUrl: string = '';

  // Define role routes with proper typing
  private roleRoutes: Record<UserRole, string> = {
    'CLIENT': '/client',
    'ADMIN': '/admin',
    'AGENT': '/agent'
  };

  constructor(
    private location: Location,
    private router: Router
  ) {}

  ngOnInit() {
    // Get the URL that was attempted before redirection
    const attemptedUrl = localStorage.getItem('attemptedUrl');
    if (attemptedUrl) {
      this.previousUrl = attemptedUrl;
      localStorage.removeItem('attemptedUrl'); // Clean up
    }
  }

  goBack() {
    console.log('Going back...');
    const userRole = localStorage.getItem('userRole') as UserRole | null;
    
    if (userRole && this.roleRoutes[userRole]) {
      // Navigate to the appropriate dashboard based on role
      this.router.navigate([this.roleRoutes[userRole]]);
    } else {
      // Fallback to home page if no role or unknown role
      this.router.navigate(['/']);
    }
  }
}