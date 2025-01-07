import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FactureServiceService {

  private baseUrl = 'https://payment-service-production-1.up.railway.app/api/v1/invoices';
  
    constructor(private http: HttpClient) { }

  getInvoice(reference: string): any {
    return this.http.get(`${this.baseUrl}/${reference}`, { observe: 'response' }).pipe(
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

  payInvoice(reference: string): any {
    return this.http.put(`${this.baseUrl}/${reference}/pay`, null, { observe: 'response' }).pipe(
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
}
