import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { WalletService } from './wallet.service';
import { CONTRACT_ADDRESSES } from '../contracts/contract-addresses';
import UNISWAP_V2_ROUTER_ABI from '../contracts/uniswap/uniswap.abi.json';

@Injectable({
  providedIn: 'root',
})
export class TradeService {
  private uniswapRouterAddress: string = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'; // Uniswap V2 Router address

  constructor(private walletService: WalletService) {}

  async swapEthForTokens(amountETH: string, tokenSymbol: string): Promise<string> {
    // Hardcoded token address for USDC (for example)
    const tokenAddress = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'; // USDC Address
    const WETH_ADDRESS = '0xC02aaA39b223FE8D0a0e5C4F27eAD9083C756Cc2'; // WETH Address

    // Directly using addresses without checksum validation
    console.log('Using WETH Address:', WETH_ADDRESS);
    console.log('Using Token Address:', tokenAddress);

    const router = new ethers.Contract(
      this.uniswapRouterAddress,
      UNISWAP_V2_ROUTER_ABI,
      this.walletService.wallet
    );

    // Ensure amountETH is a string and parse it
    const amountIn = ethers.parseEther(amountETH.toString());

    // Wrap ETH to WETH
    const wethContract = new ethers.Contract(WETH_ADDRESS, ['function deposit() public payable'], this.walletService.wallet);
    try {
      await wethContract['deposit']({ value: amountIn });
      console.log('Wrapped ETH to WETH');
    } catch (error) {
      console.error('Error wrapping ETH:', error);
      throw new Error('Error wrapping ETH');
    }

    // Set the swap path (WETH to token)
    const path = [WETH_ADDRESS, tokenAddress];
    const to = this.walletService.getWalletAddress();
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from now

    // Now swap WETH for the specified token (e.g., USDC)
    try {
      const tx = await router['swapExactTokensForTokens'](
        amountIn, // Amount of WETH to swap
        0, // Slippage tolerance (set to 0 to accept any price)
        path, // Path for the swap (WETH -> USDC)
        to, // Recipient address
        deadline // Transaction deadline
      );
      console.log('Swap transaction hash:', tx.hash);
      return tx.hash;
    } catch (error) {
      console.error('Error executing swap:', error);
      throw new Error('Error executing swap');
    }
  }
}
