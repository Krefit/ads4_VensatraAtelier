import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private API = 'http://localhost:8080/login' //sem classe no back

  estaLogado: boolean = false;
  constructor(private httpClient: HttpClient) { }

  list(){
    return this.httpClient.get<LoginModel[]>(this.API)
  }

  fazerLogin() {
    this.estaLogado = true;
  }
}

