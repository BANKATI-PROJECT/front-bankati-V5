import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
  standalone: true,
  imports: [CommonModule]
})
export class AboutComponent {
  agencies = [
    { name: 'IAM RECHARGES', imageUrl: 'assets/images/IAM-image.jpg' },
    { name: 'REDAL', imageUrl: 'assets/images/REDAL.jpeg' },
    { name: 'AMANDIS TANGER', imageUrl: 'assets/images/AMANDIS.png' },
    { name: 'IAM RECHARGES', imageUrl: 'assets/images/IAM-image.jpg' },
    { name: 'AMANDIS TANGER', imageUrl: 'assets/images/AMANDIS.png' },
    { name: 'REDAL', imageUrl: 'assets/images/REDAL.jpeg' }
    // Ajoutez d'autres agences ici
  ];
}
