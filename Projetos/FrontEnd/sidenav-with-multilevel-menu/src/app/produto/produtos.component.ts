import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

const produtosInput = {
  ProdCategoria: 'Teste2',
  ProdCustoExtra: '1',
  ProdDescricao: 'Teste2',
  ProdIdFornecedor: '2',
  ProdidMaterial: '2',
  ProdPorcentLucro: '2',
  ProdQtdMaterial: '2',
  ProdTempoMaoObra: '2'
};

@Component({
  selector: 'app-produtos',
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

  getProduto() {
    this.http.get<Produto[]>('http://localhost:8080/produto')
      .subscribe((data: Produto[]) => {
        this.produtos = data;
      })
  }

  getProdutoTest() {
    this.http.get('http://localhost:8080/produto').subscribe((r: any) => { console.log(r) });
  }

  addProduto() {
    this.http.post('http://localhost:8080/produto', produtosInput).subscribe({
      next: (response) => {
        // Success callback
        console.log('Data sent successfully:', response);
      },
      error: (error) => {
        // Error callback
        console.error('Error sending data:', error);
      }
    });
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

  onButtonClicked(item: Produto) {
    // Handle the button click event
    console.log('Button clicked:', item);
  }
}



export interface Produto {

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