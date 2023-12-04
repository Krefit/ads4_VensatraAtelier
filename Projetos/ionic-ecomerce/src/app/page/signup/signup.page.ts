import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {RegisterRequest} from '../../model/register-request';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage{
  registerRequest: RegisterRequest = { firstname: '', lastname: '', email: '', password: ''};

  constructor(
      private authService: AuthenticationService,
      private router: Router
  ) {}

  registerUser() {
    this.authService.register(this.registerRequest)
        .subscribe({
          next: (response) => {
            // Handle the response as needed
            // For example, you can check response.mfaEnabled and navigate accordingly
            if (!response.mfaEnabled) {
              localStorage.setItem('token', response.accessToken as string);
              this.authService.emitirMostrarMenu(true);
              this.router.navigate(['home']);
            } else {
              // Navigate to the two-factor authentication page
              // For simplicity, let's assume there's a page named 'two-factor-auth'
              this.router.navigate(['two-factor-auth']);
            }
          }
        });
  }

}
