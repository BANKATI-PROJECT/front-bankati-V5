import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  selector: 'app-paye-form',
  templateUrl: './paye-form.component.html',
  styleUrls: ['./paye-form.component.css'],
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
export class PayeFormComponent implements OnInit {

  billReference: string = '';   
  firstName: string = '';
  lastName: string = '';
  accountNumber: string = '';
  amount: number = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {}
  
  submitPayment() {
    // Envoyer les détails du paiement au backend pour traitement
    // Une fois le paiement effectué, vous pouvez rediriger l'utilisateur vers une page de confirmation ou de succès.
    // Dans cet exemple, nous redirigeons simplement l'utilisateur vers la page précédente.
    this.router.navigate(['/confirmepaye']);

}
cancelPayment(){

}
}
