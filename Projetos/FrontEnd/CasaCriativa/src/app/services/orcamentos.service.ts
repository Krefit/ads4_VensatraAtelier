import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

import {delay, Observable} from 'rxjs';
import { Orcamentos } from '../models/orcamentos';
import {AuthenticationService} from "./authentication.service";


@Injectable({
  providedIn: 'root'
})

export class OrcamentosService {

  private readonly API = 'http://localhost:8080/api/orcamento';
  constructor(
    private orcamentoServico: HttpClient,
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

  addOrcamento(data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.orcamentoServico.post(`${this.API}`, data, { headers });
  }

  updateOrcamento(id: number, data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.orcamentoServico.put(`${this.API}/${id}`, data, { headers });
  }

  getOrcamentoList(): Observable<any> {
    const headers = this.getHeaders();
    return this.orcamentoServico.get(`${this.API}`, { headers });
  }

  deleteOrcamento(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.orcamentoServico.delete(`${this.API}/${id}`, { headers });
  }
}
