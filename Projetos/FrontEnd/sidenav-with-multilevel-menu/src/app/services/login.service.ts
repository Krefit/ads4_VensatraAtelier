import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private API = 'http://localhost:8080/login' //usuario?

  constructor(private httpClient: HttpClient) { }

  list(){
    return this.httpClient.get<LoginModel>
  }
}
