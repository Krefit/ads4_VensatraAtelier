import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from 'rxjs/operators';
import {AuthenticationService} from "./authentication.service";

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private readonly API = 'http://localhost:8080/api/produto';

  constructor(private produtoServico: HttpClient,
              private authService: AuthenticationService
  ) {
  }
  private getHeaders(): HttpHeaders {
    // Adicione o token de autenticação aos cabeçalhos da solicitação
    const token = this.authService.getAuthToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }


  addProduto(data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.produtoServico.post(`${this.API}`, data, { headers });
  }

  updateProduto(id: number, data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.produtoServico.put(`${this.API}/${id}`, data, { headers });
  }

  getProdutoList(): Observable<any> {
    const headers = this.getHeaders();
    //return this.produtoServico.get(`${this.API}`);

    return this.produtoServico.get(`${this.API}`, { headers }).pipe(
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
    const headers = this.getHeaders();
    return this.produtoServico.delete(`${this.API}/${id}`, { headers });
  }

  getProdutosPorId(id: number): Observable<any>{
    const headers = this.getHeaders();
    return this.produtoServico.get(`${this.API}/${id}`, { headers });
  }

  getProdutosPorDescricao(descricao: string):Observable<any>{
    const headers = this.getHeaders();
    return this.produtoServico.get(`${this.API}/${descricao}`, { headers });
  }

  addMaterial_Produto(idproduto: number, idmaterial: number, data: any): Observable<any>{
    const headers = this.getHeaders();
    return this.produtoServico.post(`${this.API}/${idproduto}/material/${idmaterial}`, data, { headers })
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
