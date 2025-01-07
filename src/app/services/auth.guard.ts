import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MockAuthService } from './mock-auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: MockAuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');
    
    // Store the attempted URL for redirecting
    localStorage.setItem('attemptedUrl', state.url);

    // Log values for debugging
    console.log('User Role:', userRole);
    console.log('Token:', token);

    if (token && userRole) {
      const expectedRole = route.data['role'];
      console.log('Expected Role:', expectedRole);

      if (userRole === expectedRole) {
        return of(true);
      } else {
        return of(false).pipe(
          tap(() => {
            console.error('Access denied - insufficient role');
            this.router.navigate(['/unauthorized']);
          })
        );
      }
    } else {
      return of(false).pipe(
        tap(() => {
          console.error('User not logged in or role missing');
          this.router.navigate(['/login']);
        })
      );
    }
  }
}