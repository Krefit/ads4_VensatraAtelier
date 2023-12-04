import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';
import {VerificationRequest} from '../../model/verification-request';

@Component({
  selector: 'app-two-factory-auth',
  templateUrl: './two-factory-auth.page.html',
  styleUrls: ['./two-factory-auth.page.scss'],
})
export class TwoFactoryAuthPage {

  otpCode?: string;
  email?: string;

  constructor(
      private authService: AuthenticationService,
      private router: Router
  ) {}

  verifyTfa() {
    const verifyRequest: VerificationRequest = {
      email: this.email,  // Provide the email associated with the user
      code: this.otpCode
    };

    this.authService.verifyCode(verifyRequest)
        .subscribe({
          next: (response) => {
            localStorage.setItem('token', response.accessToken as string);
            this.authService.emitirMostrarMenu(true);
            this.router.navigate(['dashboard']);
          }
        });
  }

}
