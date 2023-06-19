import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {CoreService} from "../../services/core.service";
import {OrcamentosService} from "../../services/orcamentos.service";
import {OrcamentoEditarComponent} from "../orcamento-editar/orcamento-editar.component";

@Component({
  selector: 'app-orcamento-list',
  templateUrl: './orcamento-list.component.html',
  styleUrls: ['./orcamento-list.component.scss']
})
export class OrcamentoListComponent implements  OnInit{
  displayedColumns: string[] = [
    'id',
    'id_cliente',
    'dt_producao',
    'data_entrega',
    'id_produto',
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
    private _coreService: CoreService


  ) {}

  ngOnInit(): void {
    this.getOrcamentoListar();
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
