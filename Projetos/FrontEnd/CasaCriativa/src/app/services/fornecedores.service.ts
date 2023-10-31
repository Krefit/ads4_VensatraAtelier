import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FornecedoresService {

  private readonly API = 'http://localhost:8080/api/fornecedores';

  constructor(private fornecedoresServico: HttpClient) { }
  addFornecedor(data: any): Observable<any> {
    return this.fornecedoresServico.post(`${this.API}`, data);
  }

  updateFornecedor(id: number, data: any): Observable<any> {
    return this.fornecedoresServico.put(`${this.API}/${id}`, data);
  }

  getFornecedorList(): Observable<any> {
    return this.fornecedoresServico.get(`${this.API}`);
  }

  deleteFornecedor(id: number): Observable<any> {
    return this.fornecedoresServico.delete(`${this.API}/${id}`);
  }

  getFornecedorPorId(id: number): Observable<any>{
    return this.fornecedoresServico.get(`${this.API}/${id}`);
  }
}
