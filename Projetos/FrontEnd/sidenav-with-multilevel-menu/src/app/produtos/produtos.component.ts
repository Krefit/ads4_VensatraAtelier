import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  listarProdutos(){
    this.httpClient.get('http://localhost:8080/produtos').subscribe((r:any)=>{console.log(r)});
  }

  ngOnInit(): void {
    this.listarProdutos();
  }

}
