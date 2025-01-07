import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-transfer-money',
  templateUrl: './transfer-money.component.html',
  styleUrls: ['./transfer-money.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, // Utilisé pour [(ngModel)]
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class TransferMoneyComponent {
  senderAccount: string = ''; // Compte de l'expéditeur
  recipientAccount: string = ''; // Compte du destinataire
  amount: number | undefined; // Montant à transférer
  description: string = ''; // Description du virement
  transferDate: Date = new Date(); // Date du virement
  showConfirmation: boolean = false; // Pour afficher la confirmation
  balance: number = 1500000; // Solde initial

  // Fonction qui affiche la confirmation avant de procéder
  toggleConfirmation(): void {
    this.showConfirmation = !this.showConfirmation;
  }

  // Fonction pour annuler le virement
  cancelTransfer(): void {
    this.showConfirmation = false;
  }

  // Fonction pour effectuer le virement
  performTransfer(): void {
    if (this.amount && this.senderAccount && this.recipientAccount) {
      // Simuler la mise à jour du solde
      this.balance -= this.amount; // Débiter le montant du solde de l'expéditeur
      alert(`Virement effectué de ${this.senderAccount} vers ${this.recipientAccount} pour un montant de ${this.amount}€`);
      
      // Réinitialiser les champs après le virement
      this.senderAccount = '';
      this.recipientAccount = '';
      this.amount = undefined;
      this.description = '';
      this.showConfirmation = false;
    } else {
      alert('Veuillez remplir tous les champs avant de confirmer.');
    }
  }

  // Méthode appelée lors de la soumission du formulaire
  onSubmit() {
    this.toggleConfirmation(); // Afficher la confirmation avant de soumettre
  }
}
