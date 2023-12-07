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

  // authRequest: AuthenticationRequest = {email: '', password: ''};
  email =  '';
  password =  '';

  constructor(
      private router: Router,
  ) {
  }

  authenticate() {
    this.router.navigate(['home']);
  }
}
