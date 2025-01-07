import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private storageKey = 'transactionHistory'; // Key for localStorage
  private transactions: { hash: string; amount: string; timestamp: Date; To: string }[] = [];

  constructor() {
    // Load the transaction history from localStorage (if available)
    const storedTransactions = localStorage.getItem(this.storageKey);
    if (storedTransactions) {
      this.transactions = JSON.parse(storedTransactions);
    }
  }

  // Adds a new transaction to the transaction history
  addTransaction(tx: { hash: string; amount: string; timestamp: Date; To: string }) {
    // Optional: Limit the number of transactions to a maximum (e.g., 100)
    if (this.transactions.length >= 100) {
      this.transactions.pop(); // Remove the oldest transaction when the limit is reached
    }
    this.transactions.unshift(tx); // Add the new transaction at the front

    // Save the updated transaction history to localStorage
    localStorage.setItem(this.storageKey, JSON.stringify(this.transactions));
  }

  // Retrieves all transactions
  getTransactions(): { hash: string; amount: string; timestamp: Date; To: string }[] {
    return this.transactions;
  }

  // Optional: Clear all transactions if needed
  clearTransactions(): void {
    this.transactions = [];
    localStorage.removeItem(this.storageKey); // Also clear from localStorage
  }
}
