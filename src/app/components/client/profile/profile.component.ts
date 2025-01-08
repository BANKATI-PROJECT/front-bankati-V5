import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Pour ngModel
import { MatIconModule } from '@angular/material/icon';  // Si vous utilisez Angular Material pour les icônes
import { ClientService } from '../../../services/client/client.service';


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
  amountToUpdate: number = 0;
  isInputVisible: boolean = false;

  owner: string = '';
  balance: number = 0;

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    // Récupérez le nom du propriétaire du service
    this.owner = this.clientService.getOwner();
  }

  toggleInput(): void {
    this.isInputVisible = !this.isInputVisible;
  }


  updateBalance(): void {
    if (this.amountToUpdate !== 0) {
      this.balance += this.amountToUpdate;


      if (this.balance < 0) {
        alert('Le solde ne peut pas être négatif.');
        this.balance = 0;
      }

      alert(`Le solde a été mis à jour à ${this.balance} Dh.`);
    } else {
      alert('Veuillez entrer un montant valide.');
    }
  }

}
