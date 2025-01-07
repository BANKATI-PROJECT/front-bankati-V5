import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
  standalone: true,
    imports: [
      CommonModule,
      
    FormsModule,
    ],
})
export class CardsComponent {
  cardHolder: string = 'Nom de l\'Utilisateur'; // You can set this based on user input or session
  amount: number = 0; // Default amount
  cards: any[] = []; // Array to store card information

  onSubmit() {
    if (this.amount > 0) {
      const newCard = {
        cardHolder: this.cardHolder, // Set the card holder's name here
        amount: this.amount
      };
      this.cards.push(newCard); // Add the new card to the list
      this.amount = 0; // Reset the amount after adding the card
    } else {
      alert("Veuillez entrer un montant valide");
    }
  }
}
