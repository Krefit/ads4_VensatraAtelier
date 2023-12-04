import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {OrcamentoModel} from '../model/orcamento-model';

@Injectable({
  providedIn: 'root'
})
export class OrcamentoService {

  private readonly urlOrcamento = 'http://localhost:8080/api/orcamento';
  constructor(
      private http: HttpClient
  ) { }
  obterDetalhesOrcamento(id: number): Observable<HttpResponse<OrcamentoModel>> {
    const headers = { 'Authorization': 'Bearer ' + this.getToken() };
    return this.http.get<OrcamentoModel>(`${this.urlOrcamento}/${id}/detalhes`, { observe: 'response', headers });
  }
  salvarOrcamento(orcamento: OrcamentoModel): Observable<any> {
    const headers = { 'Authorization': 'Bearer ' + this.getToken() };
    return this.http.post(`${this.urlOrcamento}/salvar`, orcamento, { headers });
  }

  private getToken(): string {
    // Obtenha o token de onde quer que esteja armazenado (localStorage, sessionStorage, etc.)
    return localStorage.getItem('token') || '';
  }
}
