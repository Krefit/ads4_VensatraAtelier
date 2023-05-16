import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CoreService } from 'src/core/core.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProdutoService } from '../services/produto.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

const produtosInput = {
  ProdCategoria: 'Teste2',
  ProdCustoExtra: '1',
  ProdDescricao: 'Teste2',
  ProdIdFornecedor: '2',
  ProdidMaterial: '2',
  ProdPorcentLucro: '2',
  ProdQtdMaterial: '2',
  ProdTempoMaoObra: '2'
};

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit{

  produtoForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _prodService: ProdutoService,
    private _dialogRef: MatDialogRef<ProdutosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService,
    private _dialog: MatDialog,
    private _empService: ProdutoService,
  ){
    this.produtoForm = this._fb.group({
      produtoCategoria: '',
      produtoCustoExtra: 0,
      produtoDescricao: '',
      //prodId: 0,
      prodIdFornecedor: 0,
      prodIdMaterial: 0,
      prodPorcentLucro: 0,
      prodQtdMaterial: 0,
      prodTempoMaoObra: 0
    });
  }

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.produtoForm.patchValue(this.data);
  }

  onFormSubmit(){
    if(this.produtoForm.valid){
      if(this.data){
        this._prodService
        .updateProduto(this.data.id, this.produtoForm.value)
        .subscribe({
          next:(val:any) => {
            this._coreService.openSnackBar('Produto atualizado com sucesso!');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      } else {
        this._prodService.addProduto(this.produtoForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Produto adicionado com sucesso!');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      }
    }
  }

  // produtos: Produto[] = [];

  // //constructor(private http: HttpClient) { }

  // // ngOnInit() {
  // //   this.getProduto();
  // //   this.getProdutoTest();
    
  // // }

  // getProduto() {
  //   this.http.get<Produto[]>('http://localhost:8080/produto')
  //     .subscribe((data: Produto[]) => {
  //       this.produtos = data;
  //     })
  // }

  // getProdutoTest() {
  //   this.http.get('http://localhost:8080/produto').subscribe((r: any) => { console.log(r) });
  // }

  // addProduto() {
  //   this.http.post('http://localhost:8080/produto', produtosInput).subscribe({
  //     next: (response) => {
  //       // Success callback
  //       console.log('Data sent successfully:', response);
  //     },
  //     error: (error) => {
  //       // Error callback
  //       console.error('Error sending data:', error);
  //     }
  //   });
  // }

  // displayedColumns: string[] = ['prodCategoria',
  //   'prodCustoExtra',
  //   'prodDescricao',
  //   'prodId',
  //   'prodIdFornecedor',
  //   'prodIdMaterial',
  //   'prodPorcentLucro',
  //   'prodQtdMaterial',
  //   'prodTempoMaoObra'];

  // onButtonClicked(item: Produto) {
  //   // Handle the button click event
  //   console.log('Button clicked:', item);
  // }

  openAddEditProdutoForm() {
    const dialogRef = this._dialog.open(ProdutosComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getProdutoList();
        }
      },
    });
  }

  getProdutoList() {
    this._prodService.getProdutoLista().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

}



export interface Produto {

  ProdCategoria: string;
  ProdCustoExtra: number;
  ProdDescricao: string;
  Prod_ID: number;
  ProdIdFornecedor: number;
  ProdidMaterial: number;
  ProdPorcentLucro: number;
  ProdQtdMaterial: number;
  ProdTempoMaoObra: number;


}