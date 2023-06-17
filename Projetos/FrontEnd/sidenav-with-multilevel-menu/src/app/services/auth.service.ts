import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  private isAuthenticatedValue: boolean = false;

  constructor() { }

  login(username: string, password: string): boolean {
    // Lógica para autenticar o usuário (por exemplo, fazer uma solicitação HTTP para um servidor)

    // Exemplo de lógica de autenticação simples para demonstração
    if (username === 'admin' && password === 'admin') {
      this.isAuthenticatedValue = true;
      return true;
    } else {
      this.isAuthenticatedValue = false;
      return false;
    }
  }

  logout(): void {
    this.isAuthenticatedValue = false;
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedValue;
  }
}
