import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MockAuthService } from '../../services/mock-auth.service'; // Update to your service
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginResponse } from '../../services/mock-auth.service';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private authService: MockAuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      console.log('Form is invalid');
      return; // Add form validation before proceeding
    }

    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    console.log('Tentative de connexion avec les identifiants :', username, password);

    this.authService.login(username, password).subscribe(
      (response: LoginResponse | null) => {
        if (response) {
          console.log('Réponse de l\'API de connexion :', response);
          localStorage.setItem('token', response.token);

          // Simulate token payload extraction
          const tokenPayload = JSON.parse(atob(response.token.split('.')[1]));
          const userRole = response.role;
          
          // Save user role in localStorage
          localStorage.setItem('userRole', userRole);

          if (userRole === 'ADMIN') {
            console.log('Redirection vers la page d\'administration');
            this.router.navigate(['/admin']);
          } else if (userRole === 'CLIENT') {
            console.log('Redirection vers la page client');
            this.router.navigate(['/client']);
          } else if (userRole === 'AGENT') {
            console.log('Redirection vers la page agent');
            this.router.navigate(['/agent']);
          }
        } else {
          console.error('Échec de la connexion, identifiants invalides');
        }
      },
      (error: any) => {
        console.error('Erreur lors de la connexion :', error);
      }
    );
  }
}
