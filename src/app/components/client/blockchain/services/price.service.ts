import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PriceService {
  private apiBaseUrl = 'https://api.g.alchemy.com/prices/v1';

  // Authorization token
  private apiKey = 'sc_jhbzGoh__sOP3kEDE3EaF_hg9oeC1';

  constructor(private http: HttpClient) {}

  // Function to fetch current prices for multiple tokens
  getTokenPrices(symbols: string[]): Observable<any> {
    const url = `${this.apiBaseUrl}/tokens/by-symbol`;
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${this.apiKey}`);
  
    // Create HttpParams with multiple symbols
    let params = new HttpParams();
    symbols.forEach((symbol) => {
      params = params.append('symbols', symbol);
    });
  
    return this.http.get(url, { headers, params });
  }

  // Function to fetch historical prices for a token
  getHistoricalPrices(symbol: string, startTime: string, endTime: string, interval: string): Observable<any> {
    const url = `${this.apiBaseUrl}/tokens/historical`;
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${this.apiKey}`);
    
    const body = { symbol, startTime, endTime, interval };

    return this.http.post(url, body, { headers });
  }
}
