import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-recharge',
  imports: [FormsModule],
  templateUrl: './recharge.component.html',
  styleUrl: './recharge.component.css'
})
export class RechargeComponent {

  constructor(private router: Router) { }

  phoneNumber: string = '';
  amount: number = 5;

  submit(event: any){
    this.router.navigate(['/iam/recharges/offer', { phone: this.phoneNumber, amount: this.amount }]);
  }

}
