import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-coupens',
  templateUrl: './orcamento.component.html',
  styleUrls: ['./orcamento.component.scss']
})


export class CoupensComponent implements OnInit {

  orcamento: Orcamento[] = [];
  displayedColumns: string [] = ['orcaID', 'orcaIDCliente', 'orcaDtInicioProd', 'orcaDtEntrega', 'orcaIDProduto', 'orcaQtdProduto', 'orcaDesconto'];

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.listarOrcamento();
  }


  listarOrcamento(){
    this.httpClient.get<Orcamento[]>('http://localhost:8080/orcamento')
    .subscribe((data: Orcamento[]) =>{
      this.orcamento= data
    })
  }

}


export interface Orcamento{
  OrcaID: number;
  OrcaIDCliente: number;
  OrcaDtInicioProd: Date;
  OrcaDtEntrega: Date;
  OrcaIDProduto: number;
  OrcaQtdProduto: number;
  OrcaDesconto: number;
}
