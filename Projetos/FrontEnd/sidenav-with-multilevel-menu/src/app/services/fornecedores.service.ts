import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FornecedoresService {

  constructor(private fornecedoresServico: HttpClient) { }
  addFornecedor(data: any): Observable<any> {
    return this.fornecedoresServico.post('http://localhost:8080/fornecedores', data);
  }

  updateFornecedor(id: number, data: any): Observable<any> {
    return this.fornecedoresServico.put(`http://localhost:8080/fornecedores/${id}`, data);
  }

  getFornecedorList(): Observable<any> {
    return this.fornecedoresServico.get('http://localhost:8080/fornecedores');
  }

  deleteFornecedor(id: number): Observable<any> {
    return this.fornecedoresServico.delete(`http://localhost:8080/fornecedores/${id}`);
  }
}
