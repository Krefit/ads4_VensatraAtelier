import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {CoreService} from "../../services/core.service";
import {ProdutoEditarComponent} from "../produto-editar/produto-editar.component";
import {ProdutoService} from "../../services/produto.service";
import { FornecedoresService } from 'src/app/services/fornecedores.service';
import { MaterialService } from 'src/app/services/material.service';

@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.scss']
})
export class ProdutoListComponent implements OnInit{
  displayedColumns: string[] = [
    'id',
    'descricao',
    //'categoria',
    //'idMaterial',
    //'material',
    //'qtdMaterial',
    //'tempoMaoObra',
   //'custoExtra',
    //'procentLucro',
    //'idFornecedor',
    //'fornecedor',
    'action',

  ];

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _prodService: ProdutoService,
    private _coreService: CoreService,
    private _fornService: FornecedoresService,
    private _matService: MaterialService
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

  getFornecedoresPorId(id: number){
    if(id!= null) {
      this._fornService.getFornecedorPorId(id).subscribe({})
    }
  }



  getProdutoListar() {
    this._prodService.getProdutoList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

        //Trazer dados de outra tabela
        this._matService.list().subscribe((materialArray: any[]) => {
          this.dataSource.data = this.dataSource.data.map((row: any) => {
            const material = materialArray.find((m: any) => m.matID === row.prodIdMaterial);
            return { ...row, material: material ? material.matDescricao : '' };
          });
        });

        this._fornService.getFornecedorList().subscribe((fornecedorArray: any[]) => {
          this.dataSource.data = this.dataSource.data.map((row: any) => {
            const fornecedor = fornecedorArray.find((m: any) => m.fornID === row.prodIdFornecedor);
            return { ...row, fornecedor: fornecedor ? fornecedor.fornNome : ''};
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
