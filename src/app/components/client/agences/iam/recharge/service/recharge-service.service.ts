import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RechargeServiceService {

  private baseUrl = 'https://payment-service-production-1.up.railway.app/api/v1/recharges';

  constructor(private http: HttpClient) { }

  getOffers(phoneNumber: string, amount: number): Observable<any> {
    
    return this.http.get(`${this.baseUrl}/${phoneNumber}/${amount}`, { observe: 'response' }).pipe(
      map((response: any) => {
        
        if (response && response.status === 200) {
          return response.body; 
        }
        return false;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('HTTP error occurred:', error);
        return of(false);
      })
    );
  }

  recharge(phoneNumber: string, amount: number, packId: number): Observable<any> {
    
    console.log('Recharge', phoneNumber, amount, packId);
    
    return this.http.post(`${this.baseUrl}/${phoneNumber}/${amount}?userId=1`, null, { observe: 'response' }).pipe(
      map((response: any) => {
        
        if (response && response.status === 200) {
          return response; 
        }
        return false;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('HTTP error occurred:', error);
        return of(false);
      })
    );
  }


}
