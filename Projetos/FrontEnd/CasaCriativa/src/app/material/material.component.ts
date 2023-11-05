import { Component, OnInit } from '@angular/core';


import { Observable } from 'rxjs';
import { MaterialService } from '../services/material.service';
import { Material } from '../models/material';


@Component({
  selector: 'app-statistics',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss']
})

export class StatisticsComponent{
  material: Observable<Material[]>;
  displayedColumns: string[] = ["id", "descricao", "preco", "quantidade"];

 constructor(private materialService: MaterialService){
    this.material=this.materialService.list();
 }


  ngOnInit(){

  }

}






