import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-facture',
  imports: [FormsModule],
  templateUrl: './facture.component.html',
  styleUrl: './facture.component.css'
})
export class FactureComponent {
  constructor(private router: Router) {}
    
  reference: string = '';

  submit(event: any){
    this.router.navigate(['/iam/factures/detail', { reference: this.reference }]);
  }

}
