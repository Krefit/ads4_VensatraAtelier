import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {FornecedoresService} from "../../services/fornecedores.service";
import {CoreService} from "../../services/core.service";
import {FornecedorEditarComponent} from "../fornecedor-editar/fornecedor-editar.component";
import {Fornecedores} from "../../models";

@Component({
  selector: 'app-media',
  templateUrl: './fornecedores-list.component.html',
  styleUrls: ['./fornecedores-list.component.scss']
})
export class FornecedoresListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'nome',
    'cnpj',
    'endereco',
    'telefone',
    'estado',
    'cidade',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private _dialog: MatDialog,
    private _fornService: FornecedoresService,
    private _coreService: CoreService


  ) {}

  ngOnInit(): void {
    this.getFornecedorListar();
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(FornecedorEditarComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getFornecedorListar();
        }
      },
    });
  }

  getFornecedorListar() {
    this._fornService.getFornecedorList().subscribe({
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

  deleteFornecedor(id : number) {
    if (id != null) {
      this._fornService.deleteFornecedor(id).subscribe({
        next: (res) => {
          this._coreService.openSnackBar('Fornecedor Excluido!', 'done');
          this.getFornecedorListar();
        },
        error: console.log,
      });
    }
  }

  openEditForm(data: any) {
    const dialogRef= this._dialog.open(FornecedorEditarComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getFornecedorListar();
        }
      },
    });
  }
}
