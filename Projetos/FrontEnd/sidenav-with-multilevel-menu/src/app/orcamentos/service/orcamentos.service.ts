import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Orcamentos } from '../model/orcamentos';


@Injectable({
  providedIn: 'root'
})

export class OrcamentosService {

  private API = 'http://localhost:8080/orcamento';

  constructor(private httpClient: HttpClient) {}

  list(){
    return this.httpClient.get<Orcamentos[]>(this.API);
  }
}
