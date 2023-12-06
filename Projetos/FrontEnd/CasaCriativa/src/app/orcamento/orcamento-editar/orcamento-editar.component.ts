import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators } from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CoreService} from "../../services/core.service";
import {OrcamentosService} from "../../services/orcamentos.service";
import { ClienteService } from 'src/app/services/cliente.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-orcamento-editar',
  templateUrl: './orcamento-editar.component.html',
  styleUrls: ['./orcamento-editar.component.scss']
})
export class OrcamentoEditarComponent {
  empForm: FormGroup;
  produtos: any[] = [];
  clientes: any[] = [];
  selectedProdutos: {produtoId: number, descricao: string, quantidade: number}[]=[];
  orcamentoProdutos: any[]=[];

  dataSource = new MatTableDataSource<{produtoId: number, descricao: string, quantidade: number}>(this.selectedProdutos);

  displayColumnsProdutos: string[]=[
    "produtoId",
    "descricao",
    "quantidade",
    "actions"
  ];

  constructor(
    private _fb: FormBuilder,
    private _orcamentoService: OrcamentosService,
    private _dialogRef: MatDialogRef<OrcamentoEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService,
    private _cliService: ClienteService,
    private _prdService: ProdutoService,
  ) {
    this.empForm = this._fb.group({
      cliente_id: ['', Validators.required], // Add validation rule for required field
      dataInicioProd: ['', Validators.required], // Add validation rule for required field
      desconto: [0, Validators.required], // Add validation rule for required field
      //orcaDtEntrega: ['', Validators.required], // Add validation rule for required field
      produto_id: ['', Validators.required], // Add validation rule for required field
      quantidade: [0, Validators.required],
      produtos: ['', Validators.required], // Add validation rule for required field
    });
  }
  ngOnInit(): void {
    this.empForm.patchValue(this.data);
    this.loadCliente();
    this.loadProduto();
    this.dataSource = this.data.produtos;
    if(this.data){
      this.empForm.patchValue({
        cliente_id: this.data.cliente_id,
        dataInicioProd: this.data.dataInicioProd,
        desconto: this.data.desconto,
        //orcaDtEntrega: this.data.orcaDtEntrega,
        produto_id: this.data.produto_id,
        quantidade: this.data.quantidade,
        orcamentoProdutos: this.data.produtos
      });
    }

  }
  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this._orcamentoService
          .updateOrcamento(this.data.orcaID, this.empForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Orçamento editado com sucesso!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
        console.log(this.empForm.value);
      } else {
        this._orcamentoService.addOrcamento(this.empForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Orçamento adicionado com sucesso!');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });

      }
    }
  }

  loadCliente(): void {
    this._cliService.getClienteList().subscribe((cliente) => {
      this.clientes = cliente;
    });
  }

  loadProduto(): void {
    this._prdService.getProdutoList().subscribe((produto) => {
      this.produtos = produto;
    });
  }

  deleteOrcamento() {
    if (this.data) {
      this._orcamentoService.deleteOrcamento(this.data.orcaID).subscribe({
        next: (val: any) => {
          this._coreService.openSnackBar('Orçamento excluído com sucesso!');
          this._dialogRef.close(true);
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    }
  }

}
