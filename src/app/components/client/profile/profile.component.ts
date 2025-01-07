import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Pour ngModel
import { MatIconModule } from '@angular/material/icon';  // Si vous utilisez Angular Material pour les icônes


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
      imports: [
        CommonModule,FormsModule,MatIconModule
       
      ],
})
export class ProfileComponent implements OnInit {
  client: any;
  balance: number = 1500000; // Solde initial
  amountToUpdate: number = 0; // Montant à ajuster
  isInputVisible: boolean = false; // Variable pour afficher/masquer le champ de saisie

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  // Fonction pour afficher/masquer le champ de saisie
  toggleInput(): void {
    this.isInputVisible = !this.isInputVisible;
  }

  // Mise à jour du solde
  updateBalance(): void {
    if (this.amountToUpdate !== 0) {
      this.balance += this.amountToUpdate;

      // Vérification pour éviter un solde négatif
      if (this.balance < 0) {
        alert('Le solde ne peut pas être négatif.');
        this.balance = 0; // Remise à zéro si le solde devient négatif
      }

      alert(`Le solde a été mis à jour à ${this.balance} Dh.`);
    } else {
      alert('Veuillez entrer un montant valide.');
    }
  }

}