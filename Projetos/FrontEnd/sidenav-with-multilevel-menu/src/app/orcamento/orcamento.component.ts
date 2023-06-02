import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Orcamentos } from '../models/orcamentos';
import { OrcamentosService } from '../services/orcamentos.service';




@Component({
  selector: 'app-orcamento',    //ORCAMENTO ?
  templateUrl: './orcamento.component.html',
  styleUrls: ['./orcamento.component.scss'],
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






