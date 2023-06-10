import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FornecedorServicesService {

  constructor(private _http: HttpClient) { }

  addFornecedor(data: any): Observable<any> {
    return this._http.post('http://localhost:8080/fornecedores', data);
  }

  updateFornecedor(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:8080/fornecedores/${id}`, data);
  }

  getFornecedorList(): Observable<any> {
    return this._http.get('http://localhost:8080/fornecedores');
  }

  deleteFornecedor(id: number): Observable<any> {
    return this._http.delete(`http://localhost:8080/fornecedores/${id}`,);
  }




}
