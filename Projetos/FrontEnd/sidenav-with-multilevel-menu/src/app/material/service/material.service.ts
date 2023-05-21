import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Material } from 'src/app/model/material';

@Injectable({
  providedIn: 'root'
})

export class MaterialService {

  private API = 'http://localhost:8080/material';

  constructor(private httpClient: HttpClient) { }

  list(){
    this.httpClient.get<Material[]>(this.API)
  }
}
