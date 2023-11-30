import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

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
    //return this.produtoServico.get(`${this.API}`);

    return this.produtoServico.get(`${this.API}`).pipe(
      map((response: any) => {
        console.log('response.data');
        console.log(response);
        // Check response validity before processing
        if (response && response.data) {
          return response.data; // or any processed data
        }
        return []; // or handle empty data scenario
      })
    );
  }

  deleteProduto(id: number): Observable<any> {
    return this.produtoServico.delete(`${this.API}/${id}`);
  }

  getProdutosPorId(id: number): Observable<any>{
    return this.produtoServico.get(`${this.API}/${id}`);
  }

  getProdutosPorDescricao(descricao: string):Observable<any>{
    return this.produtoServico.get(`${this.API}/${descricao}`);
  }

  addMaterial_Produto(idproduto: number, idmaterial: number, data: any): Observable<any>{
    return this.produtoServico.post(`${this.API}/${idproduto}/material/${idmaterial}`, data)
  }

  addProdutoWithMaterials(produto: any, selectedMaterials: any[]): Observable<any> {
    const payload = {
      produto: produto,
      materiais: selectedMaterials
    };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.produtoServico.post<any>(`${this.API}/add-with-materials`, payload, { headers });
  }
}
