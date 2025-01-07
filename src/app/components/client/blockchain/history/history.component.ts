import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../services/transaction.service';

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.css'],
    standalone: true,  // Make this a standalone component
    imports: [CommonModule],})
export class HistoryComponent {
  transactionHistory: { hash: string; amount: string; timestamp: Date, To: string }[] = [];

  constructor(private transactionService: TransactionService) {
    this.transactionHistory = this.transactionService.getTransactions();
  }
}
