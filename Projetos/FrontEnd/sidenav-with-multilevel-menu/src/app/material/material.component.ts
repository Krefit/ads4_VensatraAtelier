import { Component, OnInit } from '@angular/core';
import { Material } from '../model/material';
import { MaterialService } from './service/material.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-statistics',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss']
})

export class StatisticsComponent{
  material: Observable<Material[]>;
  displayedColumns: string[] = ['matId', 'matDescricao', 'matPreco', 'matQuantidade'];

 constructor(private materialService: MaterialService){
    this.material=this.materialService.list();
 }


  ngOnInit(){

  }

}






