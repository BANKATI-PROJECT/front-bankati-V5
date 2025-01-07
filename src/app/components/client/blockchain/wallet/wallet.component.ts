import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

import { RouterModule } from '@angular/router';
import { WalletService } from '../services/wallet.service';
import { TransactionService } from '../services/transaction.service';

@Component({
    selector: 'app-wallet',
    templateUrl: './wallet.component.html',
    styleUrls: ['./wallet.component.css'],
    standalone: true,  // Set standalone to true
    imports: [RouterModule, CommonModule,FontAwesomeModule]})
export class WalletComponent implements OnInit {
  faCopy = faCopy;

  ethBalance: string = '0';
  tokenBalances: { name: string; symbol: string; balance: string }[] = [];
  isWalletConnected: boolean = false;
  walletAddress: string = '';
  transactionHistory: { hash: string; amount: string; timestamp: Date; To: string }[] = [];


  constructor(
    private walletService: WalletService,
    private transactionService: TransactionService
  ) {}

  ngOnInit() {
    const storedPrivateKey = localStorage.getItem('privateKey');
    if (storedPrivateKey) {
      // Attempt to connect the wallet if the private key is found
      this.walletService.connectWallet(storedPrivateKey);
      this.isWalletConnected = true;
      this.walletAddress = this.walletService.getWalletAddress();
      this.refreshBalances();
    } else {
      this.isWalletConnected = false;
    }
  }
  

  connectWallet(privateKey: string): void {
    try {
      this.walletService.connectWallet(privateKey);
      this.walletAddress = this.walletService.getWalletAddress();
      this.isWalletConnected = true;
      console.log('Wallet connected successfully!');
      this.refreshBalances();
    } catch (error) {
      console.error('Error connecting wallet:', error);
      alert('Failed to connect wallet. Please check your private key.');
    }
  }

  disconnectWallet(): void {
    this.walletService.disconnectWallet();
    this.isWalletConnected = false;
    this.walletAddress = '';
    this.ethBalance = '0';
    this.tokenBalances = [];
    this.transactionHistory=[];
    this.transactionService.clearTransactions();
  }

  async refreshBalances(): Promise<void> {
    try {
      const { ethBalance, tokenBalances } = await this.walletService.getAllBalances();
      this.ethBalance = parseFloat(ethBalance).toFixed(4).toString();
      this.tokenBalances = tokenBalances;
    } catch (error) {
      console.error('Error refreshing balances:', error);
      this.ethBalance = 'Error';
      this.tokenBalances = [];
    }
  }

  async sendTransaction(to: string, amount: string): Promise<void> {
    try {
      if (!this.isWalletConnected) {
        alert('Please connect your wallet first!');
        return;
      }

      const txHash = await this.walletService.sendTransaction(to, amount);
      console.log('Transaction sent successfully. Hash:', txHash);
      alert(`Transaction sent successfully!\nTransaction Hash: ${txHash}`);
      this.refreshBalances(); // Update balances after sending

      // Add the transaction to the history
      this.transactionService.addTransaction({
        hash: txHash,
        amount,
        timestamp: new Date(),
        To: to,
      });
    } catch (error) {
      console.error('Error sending transaction:', error);
      alert('Failed to send transaction. Please check the details and try again.');
    }
  }

  copyToClipboard(address: string): void {
    navigator.clipboard.writeText(address).then(() => {
      alert('Address copied to clipboard!');
    });
  }
}
