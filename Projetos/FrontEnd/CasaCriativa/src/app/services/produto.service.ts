import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private readonly API = 'http://localhost:8080/api/produto';
  constructor(private produtoServico: HttpClient) { }
  addProduto(data: any): Observable<any> {
    return this.produtoServico.post(`${this.API}`, data);
  }

  updateProduto(id: number, data: any): Observable<any> {
    return this.produtoServico.put(`${this.API}/${id}`, data);
  }

  getProdutoList(): Observable<any> {
    return this.produtoServico.get(`${this.API}`);
  }

  deleteProduto(id: number): Observable<any> {
    return this.produtoServico.delete(`${this.API}/${id}`);
  }

  getProdutosPorId(id: number): Observable<any>{
    return this.produtoServico.get(`${this.API}/${id}`);
  }
}
