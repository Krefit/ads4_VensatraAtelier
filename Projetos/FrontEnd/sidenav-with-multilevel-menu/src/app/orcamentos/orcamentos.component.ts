import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Orcamentos } from '../model/orcamentos';
import { OrcamentosService } from './service/orcamentos.service'


@Component({
  selector: 'app-orcamento',    //ORCAMENTO ?
  templateUrl: './orcamentos.component.html',
  styleUrls: ['./orcamentos.component.scss']
})



export class OrcamentosComponent{

  orcamentos: Observable<Orcamentos[]>;
  displayedColumns = ['orcaID', 'orcaIDCliente', 'orcaDtInicioProd', 'orcaDtEntrega', 'orcaIDProduto', 'orcaQtdProduto', 'orcaDesconto'];



      constructor(private orcamentosService: OrcamentosService){
        this.orcamentos=this.orcamentosService.list();
      }

   ngOnInit(){
  //   this.getOrcamentos();
   }


}






