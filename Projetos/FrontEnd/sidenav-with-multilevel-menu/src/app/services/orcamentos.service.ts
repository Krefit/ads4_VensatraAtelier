import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { delay } from 'rxjs';
import { Orcamentos } from '../models/orcamentos';


@Injectable({
  providedIn: 'root'
})

export class OrcamentosService {

  private API = 'http://localhost:8080/orcamento';

  constructor(private httpClient: HttpClient) {}

  list(){
    return this.httpClient.get<Orcamentos[]>(this.API)
    .pipe(
      delay(600)
    );
  }
}
