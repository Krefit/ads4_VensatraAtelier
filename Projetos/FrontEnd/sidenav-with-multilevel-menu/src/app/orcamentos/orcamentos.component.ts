import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';


@Component({
  selector: 'app-orcamento',
  templateUrl: './orcamentos.component.html',
  styleUrls: ['./orcamentos.component.scss']
})

export class OrcamentosComponent{
  orcamentos: Orcamentos[] = [];
  displayedColumns: string [] = ['orcaID', 'orcaIDCliente', 'orcaDtInicioProd', 'orcaDtEntrega', 'orcaIDProduto', 'orcaQtdProduto', 'orcaDesconto'];

  constructor(private http: HttpClient){}

  ngOnInit(){
    this.getOrcamentos();
  }

  getOrcamentos(){
    this.http.get<Orcamentos[]>('http://localhost:8080/orcamento')
      .subscribe((data: Orcamentos[]) => {
        this.orcamentos = data;
      })
  }


}

export interface Orcamentos{
  OrcaID: number;
  OrcaIDCliente: number;
  OrcaDtInicioProd: Date;
  OrcaDtEntrega: Date;
  OrcaIDProduto: number;
  OrcaQtdProduto: number;
  OrcaDesconto: number;
}




