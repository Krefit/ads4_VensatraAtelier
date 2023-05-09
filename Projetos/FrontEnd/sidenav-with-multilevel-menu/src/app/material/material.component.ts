import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-statistics',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss']
})

export class StatisticsComponent{
  material: Material[] = [];
  displayedColumns: string[] = ['matId', 'matDescricao', 'matPreco', 'matQuantidade'];

  constructor(private http: HttpClient){}

  ngOnInit(){
    this.getMaterial();
  }

  getMaterial(){
    this.http.get<Material[]>('http://localhost:8080/material')
      .subscribe((data: Material[]) => {
        this.material = data;
      })
  }


}

export interface Material{
  Mat_ID: number;
  MatDescricao: string;
  MatPreco: number;
  MatQuantidade: number;
}




