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
  selector: 'app-agences',
  templateUrl: './agences.component.html',
  styleUrls: ['./agences.component.css'],
  standalone: true,
      imports: [
        CommonModule,
      
      
      ],
})
export class AgencesComponent implements OnInit {
  creditors: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Exemple de données pour les créanciers
    this.creditors = [
      {
        image: 'assets/images/AMANDIS.png',
        name: 'AMANDIS',
        services: [
          { id: 1, name: 'FACTURES AMANDIS' },
          { id: 2, name: 'FACTURES EAU' }
        ]
      },
      {
        image: 'assets/images/IAM-image.jpg',
        name: 'IAM RECHARGES',
        services: [
          { id: 3, name: 'Téléphone SIM' },
          { id: 4, name: 'Internet' }
        ]
      },
      {
        image: 'assets/images/LYDEC.jpg',
        name: 'LYDEC',
        services: [
          { id: 5, name: 'FACTURES LYDEC' },
          { id: 6, name: 'FACTURES EAU' }
        ]
      },{
        image: 'assets/images/REDAL.jpeg',
        name: 'REDAL',
        services: [
          { id: 7, name: 'FACTURES REDAL' },
          { id: 8, name: 'FACTURES EAU' }
        ]
      },{
        image: 'assets/images/AMANDIS.png',
        name: 'AMANDIS',
        services: [
          { id: 9, name: 'FACTURES AMANDIS' },
          { id: 10, name: 'FACTURES EAU' }
        ]
      },{
        image: 'assets/images/IAM-image.jpg',
        name: 'IAM FACTURES',
        services: [
          { id: 11, name: 'PRODUIT FIX SIM' },
          { id: 12, name: 'PRODUIT INTERNET SIM' }
        ]
      }

    ];
  }

//   goservice(){
// this.router.navigate(['/facturesnonpaye']);
//   }
 
goservice(serviceId: number): void {
  // Naviguer vers la page facturesnonpaye tout en gardant le menu visible
  console.log(`Service sélectionné avec ID: ${serviceId}`);
  this.router.navigate(['/paye-form']);
}

}
