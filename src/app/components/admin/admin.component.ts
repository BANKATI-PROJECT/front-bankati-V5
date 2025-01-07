import { Component } from '@angular/core';
import { AgentListComponent } from './agent-list/agent-list.component';

@Component({
  standalone: true,
  selector: 'app-admin',
  imports: [AgentListComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}
