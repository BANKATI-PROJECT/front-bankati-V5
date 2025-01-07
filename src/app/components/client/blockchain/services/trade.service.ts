import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { WalletService } from './wallet.service';
import UNISWAP_V2_ROUTER_ABI from '../contracts/uniswap/uniswap.abi.json';
import { CONTRACT_ADDRESSES } from '../contracts/contract-addresses';


// type TokenSymbol = 'USDC' | 'USDT' | 'DAI';
@Injectable({
    providedIn: 'root',
  })
  export class TradeService {
    private uniswapRouterAddress = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';
  
    constructor(private walletService: WalletService) {}
  
    async swapEthForTokens(amountETH: string, tokenSymbol: string): Promise<string> {
        // For ethers v6, use constants for addresses to avoid checksum issues
        const WETH = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'; // Corrected checksum
        const USDC = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'; // Corrected checksum
  
        console.log('Using WETH Address:', WETH);
        console.log('Using Token Address:', USDC);
  
        const amountIn = ethers.parseEther(amountETH.toString());
  
        // Create WETH contract
        const wethContract = new ethers.Contract(
          WETH,
          ['function deposit() public payable'],
          this.walletService.wallet
        );
  
        // Wrap ETH to WETH
        const depositTx = await wethContract['deposit']({ value: amountIn });
        await depositTx.wait();
        console.log('Wrapped ETH to WETH');
  
        // Create router contract
        const router = new ethers.Contract(
          this.uniswapRouterAddress,
          UNISWAP_V2_ROUTER_ABI,
          this.walletService.wallet
        );
  
        // Approve WETH spending
        const wethTokenContract = new ethers.Contract(
          WETH,
          ['function approve(address spender, uint256 amount) public returns (bool)'],
          this.walletService.wallet
        );
        
        const approveTx = await wethTokenContract['approve'](this.uniswapRouterAddress, amountIn);
        await approveTx.wait();
        console.log('Approved WETH spending');
  
        // Prepare swap parameters
        const path = [WETH, USDC];
        const to = await this.walletService.getWalletAddress();
        const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes
  
        // Execute swap
        const swapTx = await router['swapExactTokensForTokens'](
          amountIn,
          0, // Accept any amount of tokens
          path,
          to,
          deadline
        );
  
        const receipt = await swapTx.wait();
        console.log('Swap transaction hash:', receipt.hash);
        return receipt.hash;
  

    }
  }