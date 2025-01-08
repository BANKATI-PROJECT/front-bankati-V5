import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientService } from '../../../services/client/client.service';

@Component({
  selector: 'app-credit-cart',
  templateUrl: './credit-cart.component.html',
  styleUrls: ['./credit-cart.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class CreditCartComponent {
  creditCardForm: FormGroup;
  message: string = '';
  isSuccess: boolean = false;
  solde: number = 887;


  constructor(private clientService: ClientService, private fb: FormBuilder) {
    this.creditCardForm = this.fb.group({
      owner: ['', Validators.required],
      cardNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{16}$')],
      ],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]],
      selectedMonth: ['Jan', Validators.required],
      selectedYear: ['2020', Validators.required],
    });
  }

  ajouter(): void {
    if (this.creditCardForm.invalid) {
      this.message = 'Veuillez corriger les erreurs avant de soumettre.';
      this.isSuccess = false;
      return;
    }

    const portefeuilleId = 3; // ID du portefeuille
    const realCardData = {
      safeToken: 'safe', // Remplacez par le token sécurisé
      cardNum: this.creditCardForm.value.cardNumber,
      cvv: this.creditCardForm.value.cvv,
      expire: `${this.creditCardForm.value.selectedYear}-${this.creditCardForm.value.selectedMonth}`,
      label: this.creditCardForm.value.owner,
      solde:this.solde,
    };

    console.log(realCardData);


    this.clientService.addRealCard(portefeuilleId, realCardData).subscribe(
      (response) => {
        this.message = 'Carte ajoutée avec succès !';
        this.isSuccess = true;
        console.log(response);
      },
      (error) => {
        this.message = 'Erreur lors de l’ajout de la carte.';
        this.isSuccess = false;
        console.error(error);
      }
    );

    this.clientService.setOwner(this.creditCardForm.value.owner);
  }
}
