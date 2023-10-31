import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {CoreService} from "../../services/core.service";
import { FornecedoresService } from 'src/app/services/fornecedores.service';
import { MaterialService } from 'src/app/services/material.service';
import { MaterialEditarComponent } from '../material-editar/material-editar.component';

@Component({
  selector: 'app-Material-list',
  templateUrl: './Material-list.component.html',
  styleUrls: ['./Material-list.component.scss']
})
export class MaterialListComponent implements OnInit{
  displayedColumns: string[] = [
    'id',
    'descricao',
    'quantidade',
    'preco',



    'action',
    
  ];

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _matService: MaterialService,
    private _coreService: CoreService,
    private _fornService: FornecedoresService,


  ) {}

  ngOnInit(): void {
    this.getMaterialListar();

    
  }

  openAddEditEmpForm() {
    const dialogRef
      = this._dialog.open(MaterialEditarComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getMaterialListar();
        }
      },
    });
  }

  getFornecedoresPorId(id: number){
    if(id!= null) {
      this._fornService.getFornecedorPorId(id).subscribe({})
    }
  }

  

  getMaterialListar() {
    this._matService.getMaterialList().subscribe({
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

  deleteMaterial(id : number) {
    if (id != null) {
      this._matService.deleteMaterial(id).subscribe({
        next: (res) => {
          this._coreService.openSnackBar('Material Excluido!', 'done');
          this.getMaterialListar();
        },
        error: console.log,
      });
    }
  }

  openEditForm(data: any) {
    const dialogRef= this._dialog.open(MaterialEditarComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getMaterialListar();
        }
      },
    });
  }
}
