import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {delay, Observable} from 'rxjs';
import { Orcamentos } from '../models/orcamentos';


@Injectable({
  providedIn: 'root'
})

export class OrcamentosService {

  constructor(private orcamentoServico: HttpClient) { }
  addOrcamento(data: any): Observable<any> {
    return this.orcamentoServico.post('http://localhost:8080/orcamento', data);
  }

  updateOrcamento(id: number, data: any): Observable<any> {
    return this.orcamentoServico.put(`http://localhost:8080/orcamento/${id}`, data);
  }

  getOrcamentoList(): Observable<any> {
    return this.orcamentoServico.get('http://localhost:8080/orcamento');
  }

  deleteOrcamento(id: number): Observable<any> {
    return this.orcamentoServico.delete(`http://localhost:8080/orcamento/${id}`);
  }
}
