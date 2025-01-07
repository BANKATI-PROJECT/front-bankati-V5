import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
export interface Agent {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  dateNaissance: string;
  adresse: string;
  numPattente: string;
  numPieceIdentite: string;
  pieceIdentiteFaceTwo: { imageUrl: string };
}

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  private apiUrl = 'http://localhost:8089/api/admin/listAgents';
  private url = 'http://localhost:8089/api/admin/agent';
  constructor(private http: HttpClient) {}

  getAgents(authToken: string): Observable<Agent[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
    return this.http.get<Agent[]>(this.apiUrl, { headers });
  }

  addAgent(formData: FormData): Observable<any> {
    const authToken = localStorage.getItem('authToken') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
    return this.http.post(this.url, formData, { headers });
  }
}

