import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {CoreService} from "../../services/core.service";
import {ClienteEditarComponent} from "../cliente-editar/cliente-editar.component";
import {ClienteService} from "../../services/cliente.service";

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.scss']
})
export class ClienteListComponent implements OnInit{
  displayedColumns: string[] = [
    'id',
    'nome',
    'cpf_cnpj',
    'endereco',
    'data_nascimento',
    'email',
    'telefone',
    'action',
  ];

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _cliService: ClienteService,
    private _coreService: CoreService


  ) {}

  ngOnInit(): void {
    this.getClienteListar();
  }

  openAddEditEmpForm() {
    const dialogRef
      = this._dialog.open(ClienteEditarComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getClienteListar();
        }
      },
    });
  }

  getClienteListar() {
    this._cliService.getClienteList().subscribe({
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

  deleteCliente(id : number) {
    if (id != null) {
      this._cliService.deleteCliente(id).subscribe({
        next: (res) => {
          this._coreService.openSnackBar('Cliente Excluido!', 'done');
          this.getClienteListar();
        },
        error: console.log,
      });
    }
  }

  openEditForm(data: any) {
    const dialogRef= this._dialog.open(ClienteEditarComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getClienteListar();
        }
      },
    });
  }
}
