import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay } from 'rxjs';
import { Material } from '../models/material';


@Injectable({
  providedIn: 'root'
})

export class MaterialService {

  private API = 'http://localhost:8080/api/material';
  //private API = 'https://f8c767f3-4ab2-4108-a8a4-99afc940b521.btunnel.co.in/api/material';

  constructor(private httpClient: HttpClient) { }

  list(){
    return this.httpClient.get<Material[]>(this.API);
  }

  getFornecedorPorId(id: number): Observable<any>{
    return this.httpClient.get(`${this.API}/${id}`);
  }

  addMaterial(data: any): Observable<any> {
    return this.httpClient.post(`${this.API}`, data);
  }

  updateMaterial(id: number, data: any): Observable<any> {
    return this.httpClient.put(`${this.API}/${id}`, data);
  }

  getMaterialList(): Observable<any> {
    return this.httpClient.get(`${this.API}`);
  }

  deleteMaterial(id: number): Observable<any> {
    return this.httpClient.delete(`${this.API}/${id}`);
  }

  getMaterialsPorId(id: number): Observable<any>{
    return this.httpClient.get(`${this.API}/${id}`);
  }

  
}
