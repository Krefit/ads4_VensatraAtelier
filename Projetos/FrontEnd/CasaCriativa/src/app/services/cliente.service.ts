import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthenticationService} from "./authentication.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly API = 'http://localhost:8080/api/cliente';
  constructor(
    private clienteServico: HttpClient,
    private authService: AuthenticationService
  ) { }

  private getHeaders(): HttpHeaders {
    // Adicione o token de autenticação aos cabeçalhos da solicitação
    const token = this.authService.getAuthToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }
  addCliente(data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.clienteServico.post(`${this.API}`, data, { headers });
  }

  updateCliente(id: number, data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.clienteServico.put(`${this.API}/${id}`, data, {headers});
  }

  getClienteList(): Observable<any> {
    const headers = this.getHeaders();
    return this.clienteServico.get(`${this.API}`, { headers });
  }


  deleteCliente(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.clienteServico.delete(`${this.API}/${id}`, {headers});
  }

  getClientePorId(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.clienteServico.get(`${this.API}/${id}`, {headers});
  }


}
