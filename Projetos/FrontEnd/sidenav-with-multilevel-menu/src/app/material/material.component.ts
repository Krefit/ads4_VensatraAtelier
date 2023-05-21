import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Material } from '../model/material';
import { MaterialService } from './service/material.service';


@Component({
  selector: 'app-statistics',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss']
})

export class StatisticsComponent{
  material: Material[] = [];
  displayedColumns: string[] = ['matId', 'matDescricao', 'matPreco', 'matQuantidade'];

 constructor(private materialService: MaterialService){}

  ngOnInit(){

  }

}






