import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private clienteServico: HttpClient) { }
  addCliente(data: any): Observable<any> {
    return this.clienteServico.post('http://localhost:8080/cliente', data);
  }

  updateCliente(id: number, data: any): Observable<any> {
    return this.clienteServico.put(`http://localhost:8080/cliente/${id}`, data);
  }

  getClienteList(): Observable<any> {
    return this.clienteServico.get('http://localhost:8080/cliente');
  }

  deleteCliente(id: number): Observable<any> {
    return this.clienteServico.delete(`http://localhost:8080/cliente/${id}`);
  }

  getClientePorId(id: number): Observable<any> {
    return this.clienteServico.get(`http://localhost:8080/cliente/${id}`);
  }


}
