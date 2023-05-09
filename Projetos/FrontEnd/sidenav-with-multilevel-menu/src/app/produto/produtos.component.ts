import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-settings',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent {

  produtos: Produto[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getProduto();
    this.getProdutoTest();
  }

  getProduto(){
    this.http.get<Produto[]>('http://localhost:8080/produto')
      .subscribe((data: Produto[]) => {
        this.produtos = data;
      })
  }

  getProdutoTest(){
    this.http.get('http://localhost:8080/produto').subscribe((r:any) => {console.log(r)});
  }

  displayedColumns: string[] = ['prodCategoria',
                                'prodCustoExtra',
                                'prodDescricao',
                                'prodId',
                                'prodIdFornecedor',
                                'prodIdMaterial',
                                'prodPorcentLucro',
                                'prodQtdMaterial',
                                'prodTempoMaoObra'];
}

export interface Produto{
  
  ProdCategoria: string;
  ProdCustoExtra: number;
  ProdDescricao: string;
  Prod_ID: number;
  ProdIdFornecedor: number;
  ProdidMaterial: number;
  ProdPorcentLucro: number;
  ProdQtdMaterial: number;
  ProdTempoMaoObra: number;
  
  
}