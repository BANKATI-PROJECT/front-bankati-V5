import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {AuthService} from '../../services/auth.service';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginInvalid = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.loginInvalid = true;
      return;
    }

    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe(
      (response: any) => {
        console.log('Connexion réussie :', response);

        // Redirection en fonction du rôle
        switch (response.role) {
          case 'ADMIN':
            this.router.navigate(['/admin']);
            break;
          case 'CLIENT':
            this.router.navigate(['/client']);
            break;
          case 'AGENT':
            this.router.navigate(['/agent']);
            break;
          default:
            console.error('Rôle inconnu :', response.role);
        }
      },
      (error) => {
        console.error('Erreur lors de la connexion :', error);
        this.loginInvalid = true;
      }
    );
  }
}
