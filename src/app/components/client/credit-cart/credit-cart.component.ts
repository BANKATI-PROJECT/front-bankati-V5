import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../../../app.routes';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-credit-cart',
  templateUrl: './credit-cart.component.html',
  styleUrls: ['./credit-cart.component.css'],
  standalone: true,
    imports: [
      CommonModule,
      FormsModule
    ],
})
export class CreditCartComponent {
  owner: string = '';
  cvv: string = '';
  cardNumber: string = '';
  selectedMonth: string = 'Jan';
  selectedYear: string = '2020';
  message: string = '';
  isSuccess: boolean = false;

  // Méthode appelée lors du clic sur le bouton de confirmation
  ajouter(): void {
    // Validation des champs
    if (this.owner && this.cvv && this.cardNumber && this.selectedMonth && this.selectedYear) {
      // Si tous les champs sont remplis, afficher un message de succès
      this.message = 'Cart ajouté avec succès !';
      this.isSuccess = true;
    } else {
      // Si des champs sont manquants, afficher un message d'erreur
      this.message = 'Tous les champs doivent être remplis.';
      this.isSuccess = false;
    }
    
    // Log des données (pour le débogage)
    console.log('Owner:', this.owner);
    console.log('CVV:', this.cvv);
    console.log('Card Number:', this.cardNumber);
    console.log('Expiration Date:', this.selectedMonth, this.selectedYear);
  }
}
