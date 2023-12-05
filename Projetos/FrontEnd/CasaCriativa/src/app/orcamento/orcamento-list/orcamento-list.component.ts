import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {CoreService} from "../../services/core.service";
import {OrcamentosService} from "../../services/orcamentos.service";
import {OrcamentoEditarComponent} from "../orcamento-editar/orcamento-editar.component";
import { ClienteService } from 'src/app/services/cliente.service';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-orcamento-list',
  templateUrl: './orcamento-list.component.html',
  styleUrls: ['./orcamento-list.component.scss']
})
export class OrcamentoListComponent implements  OnInit{
  displayedColumns: string[] = [
    'id',
    //'id_cliente',
    'cliente',
    'dt_producao',
    //'data_entrega',
    //'id_produto',
    'produto',
    'qtde_produto',
    'desconto',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _orcaService: OrcamentosService,
    private _coreService: CoreService,
    private _cliService: ClienteService,
    private _prdService: ProdutoService


  ) {}

  ngOnInit(): void {
    this.getOrcamentoListar();
  }

getClientePorId(id: number){
  if(id!= null){
    this._cliService.getClientePorId(id).subscribe({})
  }
}

  openAddEditEmpForm() {
    const dialogRef
      = this._dialog.open(OrcamentoEditarComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getOrcamentoListar();
        }
      },
    });
  }

  getOrcamentoListar() {
    this._orcaService.getOrcamentoList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log(res);

        this._cliService.getClienteList().subscribe((clienteArray: any[]) => {
          this.dataSource.data = this.dataSource.data.map((row: any) => {
            const cliente = clienteArray.find((m: any) => m.id === row.cliente_id);
            return { ...row, cliente: cliente ? cliente.nome : '' };
          });
        });
        this._prdService.getProdutoList().subscribe((produtoArray: any[]) => {
          this.dataSource.data = this.dataSource.data.map((row: any) => {
            const produto = produtoArray.find((m: any) => m.id === row.produto_id);
            return { ...row, produto: produto ? produto.descricao : '' };
          });
        });
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteOrcamento(id : number) {
    if (id != null) {
      this._orcaService.deleteOrcamento(id).subscribe({
        next: (res) => {
          this._coreService.openSnackBar('Orçamento Excluido!', 'Pronto');
          this.getOrcamentoListar();
        },
        error: console.log,
      });
    }
  }

  openEditForm(data: any) {
    const dialogRef= this._dialog.open(OrcamentoEditarComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getOrcamentoListar();
        }
      },
    });
  }

}
