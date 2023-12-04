import {Component} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';
import {AuthenticationRequest} from '../../model/authentication-request';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  authRequest: AuthenticationRequest = {email: '', password: ''};

  constructor(
      private authService: AuthenticationService,
      private router: Router,
  ) {
  }

  authenticate() {
    this.authService.login(this.authRequest)
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
