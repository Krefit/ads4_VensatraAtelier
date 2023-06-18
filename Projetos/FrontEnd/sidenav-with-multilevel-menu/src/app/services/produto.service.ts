import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private produtoServico: HttpClient) { }
  addProduto(data: any): Observable<any> {
    return this.produtoServico.post('http://localhost:8080/produto', data);
  }

  updateProduto(id: number, data: any): Observable<any> {
    return this.produtoServico.put(`http://localhost:8080/produto/${id}`, data);
  }

  getProdutoList(): Observable<any> {
    return this.produtoServico.get('http://localhost:8080/produto');
  }

  deleteProduto(id: number): Observable<any> {
    return this.produtoServico.delete(`http://localhost:8080/produto/${id}`);
  }
}
