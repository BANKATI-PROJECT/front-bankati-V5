import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FactureServiceService } from '../../service/facture-service.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-detail',
  imports: [CommonModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent {

  constructor(private activatedRoute: ActivatedRoute, private factureService : FactureServiceService) { }
    

  reference: string = '';
  invoice: any = null;

  submit(event: any){
    this.factureService.payInvoice(this.reference).subscribe((response: any) => {
      if (response) {
        alert('Facture payée avec succès');
      }else{
        alert('Facture payée avec succès');
      }
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.reference = params['reference'];
      this.factureService.getInvoice(this.reference).subscribe((response: any) => {
        if (response) {
          this.invoice = response;
          this.invoice.dueDate = this.invoice.dueDate.split(',').reverse().join(' / ')
        }else{
          console.error('Erreur lors de la récupération de la facture');
        }
      });
    });
  }

}
