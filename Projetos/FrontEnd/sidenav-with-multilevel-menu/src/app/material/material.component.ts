import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Material } from '../models/material';
import { MaterialService } from '../services/material.service';


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






