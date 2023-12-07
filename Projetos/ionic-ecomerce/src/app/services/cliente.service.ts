import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProdutoModel} from '../model/produto-model';
import {Cliente} from '../model/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly urlCliente = 'http://localhost:8080/api/cliente';
  constructor(
      private http: HttpClient
  ) { }

  listarClientes(): Observable<HttpResponse<Cliente[]>> {
    return this.http.get<Cliente[]>(this.urlCliente, { observe: 'response'});
  }
  buscarClientePorId(id: number){
    return this.http.get(`${this.urlCliente}/${id}`);
  }
}
