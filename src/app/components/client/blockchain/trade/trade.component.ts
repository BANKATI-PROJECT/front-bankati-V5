import { Component, OnInit } from '@angular/core';
import { WalletService } from '../services/wallet.service';
import { TradeService } from '../services/trade.service';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css'],
})
export class TradeComponent implements OnInit {
  faExchangeAlt = faExchangeAlt;

  amountETH: string = '';
  selectedToken: string = 'USDT'; // Default token
  isWalletConnected: boolean = false;
  walletAddress: string = '';
  ethBalance: string = '0';
  transactionStatus: string = '';

  constructor(
    private walletService: WalletService,
    private tradeService: TradeService
  ) {}

  ngOnInit() {
    const storedPrivateKey = localStorage.getItem('privateKey');
    if (storedPrivateKey) {
      this.walletService.connectWallet(storedPrivateKey);
      this.isWalletConnected = true;
      this.walletAddress = this.walletService.getWalletAddress();
      this.refreshBalances();
    } else {
      this.isWalletConnected = false;
    }
  }

  async refreshBalances() {
    try {
      const { ethBalance } = await this.walletService.getAllBalances();
      this.ethBalance = ethBalance;
    } catch (error) {
      console.error('Error refreshing balances:', error);
      this.ethBalance = 'Error';
    }
  }

  onTokenSelect(event: Event) {
    const selectElement = event.target as HTMLSelectElement | null;
    if (selectElement) {
      this.selectedToken = selectElement.value;
    }
  }

  async executeTrade() {
    if (!this.isWalletConnected) {
      alert('Please connect your wallet first!');
      return;
    }

    if (parseFloat(this.amountETH) <= 0) {
      alert('Please enter a valid amount of ETH.');
      return;
    }

    this.transactionStatus = 'Transaction in progress...';

    try {
      const txHash = await this.tradeService.swapEthForTokens(
        this.amountETH,
        this.selectedToken
      );
      this.transactionStatus = `Transaction sent! Hash: ${txHash}`;
      alert(`Transaction sent successfully!\nTransaction Hash: ${txHash}`);
      this.refreshBalances();
    } catch (error) {
      this.transactionStatus = 'Error executing transaction.';
      console.error('Error executing swap:', error);
      alert('Failed to execute trade. Please check the details and try again.');
    }
  }
}