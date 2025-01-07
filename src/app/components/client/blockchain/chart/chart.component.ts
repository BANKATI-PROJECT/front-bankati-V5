import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { PriceService } from '../services/price.service';
import { Chart, registerables } from 'chart.js';
import { CommonModule } from '@angular/common';
import 'chartjs-adapter-date-fns';  // Import the date adapter
import { CONTRACT_ADDRESSES } from '../contracts/contract-addresses';  // Import the contract address mapping

Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class ChartComponent implements OnInit, AfterViewInit {
  @ViewChild('priceChart') private chartRef!: ElementRef<HTMLCanvasElement>;
  private chart: Chart<'line', { x: number; y: number }[], unknown> | undefined;
  tokens: string[] = [
    'ETH', 'BTC', 'USDC', 'DAI', 'LINK', 'MATIC', 'USDT', 'UNI', 'AAVE', 
    'SUSHI', 'COMP', 'CRV', 'YFI', 'MKR', 'SNX', 'BAL'  // Added more popular tokens
  ];
  tokenPrices: { [key: string]: number } = {};
  selectedToken: string = 'ETH';  // Default selection set to ETH
  historicalPrices: { timestamp: string; value: number }[] = [];

  constructor(private priceService: PriceService) {}

  ngOnInit() {
    // Fetch token prices for ETH, BTC, and USDC
    this.priceService.getTokenPrices(this.tokens).subscribe(
      (response) => {
        if (response?.data && Array.isArray(response.data)) {
          response.data.forEach((item: any) => {
            if (item.symbol && item.prices?.length > 0) {
              // Update the tokenPrices object with the price
              this.tokenPrices[item.symbol] = item.prices[0]?.value || 0;
            }
          });
        }
      },
      (error) => {
        console.error('Error fetching current prices:', error);
      }
    );

    // Automatically select ETH and load its historical data
    this.selectToken(this.selectedToken);
  }

  ngAfterViewInit() {
    // Ensure chart is only created after the view is initialized
    if (this.chartRef && this.chartRef.nativeElement) {
      this.updateChart();
    }
  }

  selectToken(token: string) {
    this.selectedToken = token;
    const endDate = new Date().toISOString();
    const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

    this.priceService.getHistoricalPrices(token, startDate, endDate, '1d').subscribe(
      (data) => {
        console.log('API Response:', data);
        
        if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
          this.historicalPrices = data.data.map((item: any) => ({
            timestamp: new Date(item.timestamp).getTime(),  // Convert timestamp to a Date object
            value: parseFloat(item.value),  // Convert the value to a number
          }));
    
          console.log('Processed historical prices:', this.historicalPrices);
          this.updateChart();  // Update chart with the processed data
        } else {
          console.warn('No valid historical price data received.');
          this.historicalPrices = [];  // Clear any previous data
          this.updateChart();  // Update chart with empty data
        }
      },
      (error) => {
        console.error('Error fetching historical prices:', error);
        this.historicalPrices = [];  // Clear any previous data
        this.updateChart();  // Update chart with empty data
      }
    );
  }

  private updateChart() {
    if (!this.chartRef.nativeElement) {
      console.error('Canvas element not found');
      return;
    }

    const ctx = this.chartRef.nativeElement.getContext('2d');
    if (!ctx) {
      console.error('Failed to get 2D context for the canvas');
      return;
    }

    const chartData = this.historicalPrices.map((item) => ({
      x: new Date(item.timestamp).getTime(), // Ensure x is a number (timestamp)
      y: item.value,
    }));

    if (this.chart) {
      this.chart.destroy();
      this.chart = undefined;  // Clear the reference to allow re-creation
    }

    if (chartData.length > 0) {
      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          datasets: [
            {
              label: `${this.selectedToken} Price`,
              data: chartData,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'day',
              },
            },
            y: {
              beginAtZero: false,
            },
          },
        },
      });
    }
  }

  getCurrentPrice(token: string): number {
    return this.tokenPrices[token] || 0;
  }

  // Get contract address and logo for the selected token
  getTokenInfo(token: string) {
    return CONTRACT_ADDRESSES[token];
  }
}
