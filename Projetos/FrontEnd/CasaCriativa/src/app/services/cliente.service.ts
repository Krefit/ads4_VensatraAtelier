import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly API = 'http://localhost:8080/api/cliente';
  //private readonly API = 'https://f8c767f3-4ab2-4108-a8a4-99afc940b521.btunnel.co.in/api/cliente';
  constructor(private clienteServico: HttpClient) { }
  addCliente(data: any): Observable<any> {
    console.log(data);
    return this.clienteServico.post(`${this.API}`, data);
  }

  updateCliente(id: number, data: any): Observable<any> {
    return this.clienteServico.put(`${this.API}/${id}`, data);
  }

  getClienteList(): Observable<any> {
    return this.clienteServico.get(`${this.API}`);
  }

  deleteCliente(id: number): Observable<any> {
    return this.clienteServico.delete(`${this.API}/${id}`);
  }

  getClientePorId(id: number): Observable<any> {
    return this.clienteServico.get(`${this.API}/${id}`);
  }


}
