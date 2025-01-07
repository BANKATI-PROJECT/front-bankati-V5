import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RechargeServiceService } from '../../service/recharge-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-offer',
  imports: [FormsModule, CommonModule],
  templateUrl: './offer.component.html',
  styleUrl: './offer.component.css'
})
export class OfferComponent {
  offers: any[] = []
  selectedOffer: any = null;

  constructor(private rechargeService: RechargeServiceService, 
              private http : HttpClient, 
              private router: Router,
              private activeRoute : ActivatedRoute) { }
    

  submit(event: any){
    this.rechargeService.recharge(this.activeRoute.snapshot.params['phone'], this.activeRoute.snapshot.params['amount'], this.selectedOffer).subscribe(response => {
      if (response) {
        alert('Recharge effectuée avec succès');
        this.router.navigate(['/iam/recharges']);
      }else{
        alert('Erreur lors de la recharge');
        this.router.navigate(['/iam/recharges']);
      }
    });
  }


  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.rechargeService.getOffers(params['phone'], params['amount']).subscribe(response => {
        if (response) {
          
          this.offers = response.packs;
        }else{
          alert('Erreur lors de la récupération des offres');
          this.router.navigate(['/iam/recharges']);
        }
      });
    });
  }
}

