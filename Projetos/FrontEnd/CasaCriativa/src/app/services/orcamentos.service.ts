import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {delay, Observable} from 'rxjs';
import { Orcamentos } from '../models/orcamentos';


@Injectable({
  providedIn: 'root'
})

export class OrcamentosService {

  private readonly API = 'http://localhost:8080/api/orcamento';
  constructor(private orcamentoServico: HttpClient) { }
  addOrcamento(data: any): Observable<any> {
    return this.orcamentoServico.post(`${this.API}`, data);
  }

  updateOrcamento(id: number, data: any): Observable<any> {
    return this.orcamentoServico.put(`${this.API}/${id}`, data);
  }

  getOrcamentoList(): Observable<any> {
    return this.orcamentoServico.get(`${this.API}`);
  }

  deleteOrcamento(id: number): Observable<any> {
    return this.orcamentoServico.delete(`${this.API}/${id}`);
  }

  addOrcamentoWithProdutos(orcamento: any, selectedProdutos: any[], cliente: any): Observable<any>{
    const payload = {
      orcamento: orcamento,
      produtos: selectedProdutos,
      cliente: cliente
    };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.orcamentoServico.post<any>(`${this.API}/add-with-produtos`, payload, {headers});
  }
}
