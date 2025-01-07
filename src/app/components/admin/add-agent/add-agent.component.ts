import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field'; // Importez MatFormFieldModule
import { MatInputModule } from '@angular/material/input'; // Importez MatInputModule
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';



import { Router, RouterModule } from '@angular/router';
import { AgentService } from '../../../services/agent.service';

@Component({
  standalone: true,
  imports: [RouterModule, CommonModule, MatTableModule, MatCardModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule],
  selector: 'app-add-agent',
  templateUrl: './add-agent.component.html',
  styleUrls: ['./add-agent.component.css']
})
export class AddAgentComponent {
  backoffice!: FormGroup;
  selectedFiles: File[] = []; // Pour gérer les fichiers multiples

  constructor(private fb: FormBuilder, private agentService: AgentService, private router: Router) {
    // Initialisation du formulaire
    this.backoffice = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      numCIN: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      adresse: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      confirmEmail: ['', [Validators.required, Validators.email]],
      numTelephone: ['', Validators.required],
      numImmatriculeRegisterCommerce: ['', Validators.required],
      numPattente: ['', Validators.required],
      pieceJoints: [null, Validators.required], // Validation pour fichiers
    }, { validators: this.emailMatchValidator });
  }

  // Validation personnalisée pour les emails
  emailMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const email = group.get('email')?.value;
    const confirmEmail = group.get('confirmEmail')?.value;
    return email === confirmEmail ? null : { emailMismatch: true };
  }

  // Gestion des fichiers sélectionnés
  onFileSelected(event: any): void {
    const files = event.target.files;
    console.log('Fichiers sélectionnés:', files); // Ajout pour débogage
    for (let i = 0; i < files.length; i++) {
      this.selectedFiles.push(files[i]);
    }
    console.log('Tableau des fichiers:', this.selectedFiles);
  }

  // Envoi des données au backend
  onSubmit(): void {
    if (this.backoffice.invalid) {
      console.log('Formulaire invalide : ', this.backoffice.errors);
      console.log('État des contrôles :', this.backoffice.controls);
      return;
    }

    const formData = new FormData();
    formData.append('nom', this.backoffice.value.nom);
    formData.append('prenom', this.backoffice.value.prenom);
    formData.append('numCIN', this.backoffice.value.numCIN);
    formData.append('dateNaissance', this.backoffice.value.dateNaissance);
    formData.append('adresse', this.backoffice.value.adresse);
    formData.append('email', this.backoffice.value.email);
    formData.append('numTelephone', this.backoffice.value.numTelephone);
    formData.append('numImmatriculeRegisterCommerce', this.backoffice.value.numImmatriculeRegisterCommerce);
    formData.append('numPattente', this.backoffice.value.numPattente);

    // Ajout des fichiers
    this.selectedFiles.forEach((file) => formData.append('pieceJoints', file));

    console.log('FormData avant envoi:', formData);
    this.agentService.addAgent(formData).subscribe(
      (response) => {
        console.log('Agent ajouté avec succès', response);
        this.router.navigate(['/admin/dashboard']);
      },
      (error) => {
        console.error('Erreur lors de l’ajout de l’agent', error);
      }
    );
  }

  // Annuler l'opération
  onCancel(): void {
    this.router.navigate(['/admin/dashboard']);
  }
}
