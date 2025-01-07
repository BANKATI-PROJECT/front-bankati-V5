import { Component, OnInit } from '@angular/core';
import { Agent, AgentService } from '../../../services/agent.service';
import { Router, RouterModule } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field'; // Importez MatFormFieldModule
import { MatInputModule } from '@angular/material/input'; // Importez MatInputModule
import { MatSelectModule } from '@angular/material/select';
 import { CommonModule } from '@angular/common';
@Component({
  standalone: true,
  imports: [RouterModule, MatIcon, CommonModule, MatTableModule, MatCardModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  selector: 'app-agent-list',
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.css']
})
export class AgentListComponent implements OnInit {

  agents: Agent[] = [];
  displayedColumns: string[] = ['lastName', 'firstName', 'idType', 'idNumber', 'birthDate', 'address', 'email', 'phone', 'patentNumber', 'actions'];

  constructor(private agentService: AgentService, private router: Router) {}

  ngOnInit(): void {
    const authToken = localStorage.getItem('authToken');
    const userRole = localStorage.getItem('userRole');

    if (authToken && userRole === 'ADMIN') {
      this.agentService.getAgents(authToken).subscribe({
        next: (agents) => {
          console.log('Agents:', agents);
          this.agents = agents;
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des agents:', err);
          if (err.status === 403) {
            alert('Vous n’avez pas les autorisations nécessaires pour accéder à cette ressource.');
          }
        }
      });
    } else {
      alert('Vous n’êtes pas autorisé à accéder à cette page.');
      this.router.navigate(['/login']); // Rediriger vers la page de connexion
    }
  }

  editAgent(agent: Agent): void {
    alert(`Modification de l'agent ${agent.nom} à implémenter.`);
  }

  deleteAgent(agent: Agent): void {
    const index = this.agents.indexOf(agent);
    if (index !== -1) {
      this.agents.splice(index, 1);
      alert(`Suppression de l'agent ${agent.nom} à implémenter.`);
    }
  }

  goBack(): void {
    this.router.navigate(['/admin']);
  }
}
