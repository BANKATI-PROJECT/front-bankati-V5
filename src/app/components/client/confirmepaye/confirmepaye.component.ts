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
  selector: 'app-confirmepaye',
  templateUrl: './confirmepaye.component.html',
  styleUrls: ['./confirmepaye.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    
    AppRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    HttpClientModule,
    MatMenuModule,
    MatToolbarModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule
  ],
})
export class ConfirmepayeComponent {
  confirmPayment() {
    // Confirmer le paiement (ici, afficher une alerte)
    alert('Paiement confirmé!');
  }

  cancelPayment() {
    // Annuler le paiement et réinitialiser les champs du formulaire
    // this.firstName = '';
    // this.lastName = '';
    // this.accountNumber = '';
    // this.amount = 0;
    // this.showConfirmation = false;
  }
}
