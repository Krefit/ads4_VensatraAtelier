import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { ClientServiceService } from './../app/services/client-service.service';

@Component({
  selector: 'app-pages',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class PagesComponent implements OnInit {

    constructor(private httpClient: HttpClient) { }


    listarclientes(){
  this.httpClient.get('http://localhost:8080/cliente').subscribe((r:any) =>{console.log(r)})
    }
  ngOnInit(): void {
    this.listarclientes();
  }

}
