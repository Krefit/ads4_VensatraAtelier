import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay } from 'rxjs';
import { Material } from '../models/material';


@Injectable({
  providedIn: 'root'
})

export class MaterialService {

  private API = 'http://localhost:8080/material';

  constructor(private httpClient: HttpClient) { }

  list(){
    return this.httpClient.get<Material[]>(this.API)
    .pipe(
      delay(600)
    );
  }

  getFornecedorPorId(id: number): Observable<any>{
    return this.httpClient.get(`http://localhost:8080/produto/${id}`);
  }
}
