import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from 'src/app/models/loginModel';
import { LoginService } from 'src/app/services/login.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

   loginForm! : FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService
    )
  {}

  ngOnInit(){

    this.loginForm = this.formBuilder.group(
    {
      user: ['', [Validators.required]],
      password: ['', [Validators.required]]
    }

    // this.loginService = LoginService.fazerLogin();
  )
  }


  userFormControl: FormControl = new FormControl('', Validators.required);
  checkErrorsAndSetPlaceholderUser(): void {
  const userField = this.userFormControl;

  if (userField.errors) {
    userField.setErrors({}); // Limpa os erros para evitar recursividade
    userField.updateValueAndValidity(); // Atualiza a validade do campo

    // Define o valor do placeholder como "Formato inválido"
    userField.setValidators(Validators.required);
    userField.updateValueAndValidity();
    userField.setErrors({ format: true });
  } else {
    // Define o valor do placeholder original
    userField.setValidators(Validators.required);
    userField.updateValueAndValidity();
  }
}


passwordFormControl: FormControl = new FormControl('', Validators.required);
checkErrorsAndSetPlaceholderPassword(): void {
  const passwordField = this.passwordFormControl;

  if (passwordField.errors) {
    passwordField.setErrors({}); // Limpa os erros para evitar recursividade
    passwordField.updateValueAndValidity(); // Atualiza a validade do campo

    // Define o valor do placeholder como "Formato inválido"
    passwordField.setValidators(Validators.required);
    passwordField.updateValueAndValidity();
    passwordField.setErrors({ format: true });
  } else {
    // Define o valor do placeholder original
    passwordField.setValidators(Validators.required);
    passwordField.updateValueAndValidity();
  }
}

submitLogin(){
  var dadosLogin = this.loginForm.getRawValue() as LoginModel;
}
}
