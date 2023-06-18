import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {CoreService} from "../../services/core.service";
import {ProdutoEditarComponent} from "../produto-editar/produto-editar.component";
import {ProdutoService} from "../../services/produto.service";

@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.scss']
})
export class ProdutoListComponent implements OnInit{
  displayedColumns: string[] = [
    'id',
    'descricao',
    'categoria',
    'idMaterial',
    'qtdMaterial',
    'tempoMaoObra',
    'custoExtra',
    'procentLucro',
    'idFornecedor',
  ];

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _prodService: ProdutoService,
    private _coreService: CoreService


  ) {}

  ngOnInit(): void {
    this.getProdutoListar();
  }

  openAddEditEmpForm() {
    const dialogRef
      = this._dialog.open(ProdutoEditarComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getProdutoListar();
        }
      },
    });
  }

  getProdutoListar() {
    this._prodService.getProdutoList().subscribe({
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

  deleteProduto(id : number) {
    if (id != null) {
      this._prodService.deleteProduto(id).subscribe({
        next: (res) => {
          this._coreService.openSnackBar('Produto Excluido!', 'done');
          this.getProdutoListar();
        },
        error: console.log,
      });
    }
  }

  openEditForm(data: any) {
    const dialogRef= this._dialog.open(ProdutoEditarComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getProdutoListar();
        }
      },
    });
  }
}
