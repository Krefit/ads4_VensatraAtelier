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
    this.router.navigate(['home']);
  }

}
