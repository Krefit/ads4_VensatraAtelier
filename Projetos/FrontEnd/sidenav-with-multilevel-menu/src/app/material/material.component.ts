import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-statistics',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss']
})


export interface Material{
  Mat_ID: number;
  MatDescricao: string;
  MatPreco: number;
  MatQuantidade: number;
}

export class StatisticsComponent implements OnInit {

  constructor(private httpClient: HttpClient) {}


  Material: Observable<Material[]> = of([]);

  //displayedColumns: Material[];

  listarMateriais(): Observable<Material[]>{
    return this.httpClient.get('http://localhost:8080/material').pipe(
      map((r: any) =>{
      return r;
    })
    );
  }

  ngOnInit(): void {

    this.listarMateriais();
  }

}
