import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private baseUrl = 'https://311c-105-73-96-213.ngrok-free.app'; // Remplacez par votre URL backend

  constructor(private http: HttpClient) {}

  // Méthode pour ajouter une carte réelle
  addRealCard(portefeuilleId: number, realCardData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/portefeuilles/addRealCard/${portefeuilleId}`, realCardData, { responseType: 'text' });
  }

  // Méthode pour obtenir les cartes liées
  getRealCards(portefeuilleId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/getRealCards/${portefeuilleId}`);
  }

  // Méthode pour obtenir le solde du portefeuille
  getPortefeuille(portefeuilleId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${portefeuilleId}`);
  }



  private owner: string = '';

  setOwner(owner: string): void {
    this.owner = owner;
  }

  getOwner(): string {
    return this.owner;
  }
}
