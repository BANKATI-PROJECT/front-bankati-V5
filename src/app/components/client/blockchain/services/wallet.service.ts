import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { Token } from '../models/token.models';
import { CONTRACT_ADDRESSES } from '../contracts/contract-addresses';
import ERC20_ABI from '../contracts/erc20/erc20.abi.json';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  private provider!: ethers.JsonRpcProvider;
  public wallet!: ethers.Wallet;

  constructor() {
    this.provider = new ethers.JsonRpcProvider('https://8545-01j63653k7pfw8c13vvx79j1z9.cloudspaces.litng.ai');
    const storedPrivateKey = localStorage.getItem('privateKey');
    if (storedPrivateKey) {
      this.connectWallet(storedPrivateKey);
    }
  }

  connectWallet(privateKey: string) {
    try {
      this.wallet = new ethers.Wallet(privateKey, this.provider);
      localStorage.setItem('privateKey', privateKey);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      throw new Error('Invalid private key or connection error.');
    }
  }

  getWalletAddress(): string {
    return this.wallet.address;
  }

  // Fetch ETH balance
  async getEthBalance(): Promise<string> {
    try {
      const checksumAddress = ethers.getAddress(this.wallet.address);
      const balance = await this.provider.getBalance(checksumAddress);
      const formattedBalance = ethers.formatEther(balance);
      return formattedBalance;
    } catch (error) {
      console.error('Error fetching ETH balance:', error);
      throw new Error('Failed to fetch ETH balance.');
    }
  }

  // Fetch Token Balance (ERC-20)
  private async getTokenBalance(address: string, tokenAddress: string): Promise<string> {
    try {
      const checksumTokenAddress = ethers.getAddress(tokenAddress);
      const checksumAddress = ethers.getAddress(address);
      const contract = new ethers.Contract(checksumTokenAddress, ERC20_ABI, this.provider);
      const balance = await contract['balanceOf'](checksumAddress);
      const decimals = await contract['decimals']();
      return ethers.formatUnits(balance, decimals);
    } catch (error) {
      console.error('Error fetching token balance:', error);
      throw new Error('Failed to fetch token balance.');
    }
  }

  // Fetch all balances (ETH + ERC-20 tokens)
  async getAllBalances(): Promise<{ ethBalance: string; tokenBalances: Token[] }> {
    try {
      const ethBalance = await this.getEthBalance();
      const tokenBalances: Token[] = [];

      for (const [symbol, tokenInfo] of Object.entries(CONTRACT_ADDRESSES)) {
        if (tokenInfo.address === 'native token') continue; // Skip ETH handling here

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
    } catch (error) {
      console.error('Error fetching all balances:', error);
      throw new Error('Failed to fetch balances.');
    }
  }

  // Send transaction (ETH)
  async sendTransaction(to: string, amount: string): Promise<string> {
    try {
      const tx = await this.wallet.sendTransaction({
        to: to,
        value: ethers.parseEther(amount),
      });
      return tx.hash;
    } catch (error) {
      console.error('Error sending transaction:', error);
      throw new Error('Failed to send transaction.');
    }
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
