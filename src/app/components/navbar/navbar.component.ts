import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {AuthService} from '../../services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class NavbarComponent {
  constructor(private authService: AuthService, private router: Router) {}

  // Méthode pour vérifier si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  // Méthode pour vérifier si l'utilisateur est déconnecté
  isLoggedOut(): boolean {
    return !this.authService.isLoggedIn();
  }

  // Méthode pour vérifier si l'utilisateur est un admin
  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  // Méthode pour vérifier si l'utilisateur est un agent
  isAgent(): boolean {
    return this.authService.isAgent();
  }

  // Méthode pour vérifier si l'utilisateur est un client
  isClient(): boolean {
    return this.authService.isClient();
  }

  // Méthode de déconnexion
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']); // Redirige l'utilisateur vers la page de connexion après la déconnexion
  }
}
