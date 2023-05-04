import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss']
})
export class StatisticsComponent implements OnInit {

  constructor(private httpClient: HttpClient) {}


  listarMateriais(){
    this.httpClient.get('http://localhost:8080/material').subscribe((r:any) =>{console.log(r)});
  }

  ngOnInit(): void {

    this.listarMateriais();
  }

}
