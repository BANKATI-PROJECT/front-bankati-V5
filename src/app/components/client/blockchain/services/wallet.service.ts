import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { Token } from '../models/token.models'; // Import the Token model
import { CONTRACT_ADDRESSES } from '../contracts/contract-addresses'; // Import the contract addresses
import ERC20_ABI from '../contracts/erc20/erc20.abi.json'; // Importing the ERC20 ABI

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  private provider!: ethers.JsonRpcProvider;
  private wallet!: ethers.Wallet;

  constructor() {
    this.provider = new ethers.JsonRpcProvider('https://8545-01j63653k7pfw8c13vvx79j1z9.cloudspaces.litng.ai');
    const storedPrivateKey = localStorage.getItem('privateKey');
    if (storedPrivateKey) {
      this.connectWallet(storedPrivateKey);
    }
  }

  connectWallet(privateKey: string) {
    this.wallet = new ethers.Wallet(privateKey, this.provider);
    localStorage.setItem('privateKey', privateKey);
  }

  getWalletAddress(): string {
    return this.wallet.address;
  }

  // Fetch ETH balance
  async getEthBalance(): Promise<string> {
    try {
      console.log('Fetching ETH balance...'); // Log message  
      const checksumAddress = ethers.getAddress(this.wallet.address); // Ensure checksummed address
      const balance = await this.provider.getBalance(checksumAddress); // Fetch balance from provider
      console.log('Raw Balance (wei):', balance.toString()); // Log raw balance
      const formattedBalance = ethers.formatEther(balance); // Convert balance from wei to ether
      console.log('Formatted Balance (ether):', formattedBalance); // Log formatted balance
      return formattedBalance; // Return formatted balance as a string
    } catch (error) {
      console.error('Error fetching ETH balance:', error);
      return 'Error'; // If there's an error, return 'Error'
    }
  }

  // Fetch Token Balance (ERC-20)
  private async getTokenBalance(address: string, tokenAddress: string): Promise<string> {
    const checksumTokenAddress = ethers.getAddress(tokenAddress); // Ensure checksummed token address
    const checksumAddress = ethers.getAddress(address); // Ensure checksummed wallet address
    const contract = new ethers.Contract(checksumTokenAddress, ERC20_ABI, this.provider);
    const balance = await contract['balanceOf'](checksumAddress); // Fetch token balance
    return ethers.formatUnits(balance, 18); // Assuming 18 decimals for ERC-20 tokens
  }

  // Fetch all balances (ETH + ERC-20 tokens)
  async getAllBalances(): Promise<any> {
    // Fetch ETH balance
    const ethBalance = await this.getEthBalance();

    // Fetch ERC-20 token balances
    const tokenBalances: Token[] = [];
    for (const [symbol, tokenInfo] of Object.entries(CONTRACT_ADDRESSES)) {
      if (tokenInfo.address === 'native token') {
        // Handle ETH separately (skip this loop iteration for now)
        continue;
      }
    
      // Process all other tokens
      const checksumTokenAddress = ethers.getAddress(tokenInfo.address);
      const balance = await this.getTokenBalance(this.wallet.address, checksumTokenAddress);
      tokenBalances.push({
        name: symbol,
        symbol: symbol,
        address: checksumTokenAddress,
        balance: balance,
      });
    }

    return { ethBalance, tokenBalances };
  }

  // Send transaction (ETH)
  async sendTransaction(to: string, amount: string): Promise<string> {
    const tx = await this.wallet.sendTransaction({
      to: to,
      value: ethers.parseEther(amount),
    });
    return tx.hash;
  }

  // Disconnect wallet and clear local storage
  disconnectWallet() {
    this.wallet = {} as ethers.Wallet;
    localStorage.removeItem('privateKey');
  }

  // Fetch token metadata based on the symbol
  getTokenMetadata(symbol: string) {
    const tokenInfo = CONTRACT_ADDRESSES[symbol.toUpperCase()];
    if (tokenInfo) {
      return tokenInfo;
    } else {
      throw new Error(`Token symbol ${symbol} not found.`);
    }
  }
}
