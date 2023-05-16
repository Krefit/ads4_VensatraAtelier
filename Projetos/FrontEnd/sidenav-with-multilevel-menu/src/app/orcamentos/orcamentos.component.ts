import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';



@Component({
  selector: 'app-orcamento',    //ORCAMENTO ?
  templateUrl: './orcamentos.component.html',
  styleUrls: ['./orcamentos.component.scss']
})



export class OrcamentosComponent{
  orcamentos: Orcamentos[] = [];
  displayedColumns: string [] = ['orcaID', 'orcaIDCliente', 'orcaDtInicioProd', 'orcaDtEntrega', 'orcaIDProduto', 'orcaQtdProduto', 'orcaDesconto'];

  arr = Object.values(this.orcamentos);
  valoresFiltrados: any[]=[];

  valorFiltrado(values: string){
    this.valoresFiltrados = this.arr.filter(option =>
      option.OrcaID);

  }

  // filterOptions(value: string) {
  //   // Perform filtering logic based on user input
  //   this.filteredOptions = arr.filter(option =>
  //     option.column1.toLowerCase().includes(value.toLowerCase()) ||
  //     option.column2.toLowerCase().includes(value.toLowerCase()) ||
  //     option.column3.toLowerCase().includes(value.toLowerCase())
  //   );
  // }

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




