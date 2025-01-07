
import { Component } from '@angular/core';


import { MatToolbarModule } from '@angular/material/toolbar';        // Pour mat-toolbar
import { MatIconModule } from '@angular/material/icon';              // Pour mat-icon
import { MatButtonModule } from '@angular/material/button';          // Pour mat-button
import { MatDrawerMode, MatSidenavModule } from '@angular/material/sidenav';         // Pour mat-drawer
import { MatListModule } from '@angular/material/list';              // Pour mat-nav-list et mat-list-item
import { AgencesComponent } from '../agences/agences.component';
import { ProfileComponent } from '../profile/profile.component';
import { CreditCartComponent } from '../credit-cart/credit-cart.component';
import { TransferMoneyComponent } from '../transfer-money/transfer-money.component';
import { CardsComponent } from '../cards/cards.component';
import { CommonModule } from '@angular/common';
import { WalletComponent } from '../blockchain/wallet/wallet.component';
import { ChartComponent } from '../blockchain/chart/chart.component';
import { HistoryComponent } from '../blockchain/history/history.component';
import { TradeComponent } from '../blockchain/trade/trade.component';



@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
  standalone: true,
  imports: [ CommonModule, MatToolbarModule,MatSidenavModule, MatIconModule, MatButtonModule, MatListModule,AgencesComponent,  
    ProfileComponent,   
    CreditCartComponent,
    TransferMoneyComponent,
    CardsComponent,WalletComponent, ChartComponent,HistoryComponent,TradeComponent],
   
      
      
    
   
  
})
export class ClientComponent {
  badgevisible = false;

  badgevisibility() {
    this.badgevisible = true;
  }

 


  
  showWallet = false;  // Indique si le menu Crypto Wallet est affiché
  currentView: string = 'profile';  // La vue actuellement affichée (par défaut 'profile')

  // Méthodes pour changer la vue affichée
  navigateTo(view: string) {
    this.currentView = view;
    this.showWallet = false;  // Fermer le menu des wallets quand une vue est sélectionnée
  }

  // Afficher/masquer les sous-éléments du Crypto Wallet
  toggleCryptoWalletView() {
    this.showWallet = !this.showWallet;
  }

  // Sélectionner la vue dans le menu Crypto Wallet
  setCurrentView(view: string) {
    this.currentView = view;
    this.showWallet = false;  // Fermer le menu des wallets lorsque la vue est définie
  }

  
}
