import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { CoreService } from "../../services/core.service";
import { OrcamentosService } from "../../services/orcamentos.service";
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
  selectedProdutos: { produtoId: number, descricao: string, quantidadeProduto: number }[] = [];
  selectedCliente: any;
  orcamentoProdutos: any[] = [];

  dataSource = new MatTableDataSource<{ produtoId: number, descricao: string, quantidadeProduto: number }>(this.selectedProdutos);

  displayColumnsProdutos: string[] = [
    "produtoId",
    "descricao",
    "quantidadeProduto",
    //"actions"
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
      quantidadeProduto: [0, Validators.required],
      produtos: ['', Validators.required], // Add validation rule for required field
    });
  }
  ngOnInit(): void {
    this.empForm.patchValue(this.data);
    this.loadCliente();
    this.loadProduto();
    this.dataSource = this.data.produtos;
    if (this.data) {
      this.empForm.patchValue({
        cliente_id: this.data.cliente_id,
        dataInicioProd: this.data.dataInicioProd,
        desconto: this.data.desconto,
        //orcaDtEntrega: this.data.orcaDtEntrega,
        produto_id: this.data.produto_id,
        quantidadeProduto: this.data.quantidadeProduto,
        orcamentoProdutos: this.data.produtos
      });
    }

  }

  initializeForm(): void {
    this.empForm = this._fb.group({
      orcamentoID: [0],
      cliente_id: ['', Validators.required],
      desconto: ['', Validators.required],
      quantidadeProduto: ['', [Validators.required, Validators.min(1)]],
      produto_id: ['', Validators.required],
      orcamentoProdutos: ['', Validators.required],
    });
  }

  onFormSubmit() {
    if (this.selectedProdutos.length > 0) {
      const orcamentoData = this.empForm.value;

      this._orcamentoService.addOrcamentoWithProdutos(orcamentoData, this.selectedProdutos, this.selectedCliente).subscribe({
        next: (val: any) => {
          this._coreService.openSnackBar('Orcamento adicionado com sucesso!');
          this._dialogRef.close(true);
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    }else{
      console.error('Form is invalid or no produtos are selected.');
      this._coreService.openSnackBar('Adicione um produto ao orçamento!');
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

  addProdutoToTable(): void{
    if(true){
      const selectedProdutoId = this.empForm.get('produto_id')?.value;
      const selectedProduto = this.produtos.find(produto => produto.id === selectedProdutoId);
      const selectedQuantity = this.empForm.get('quantidadeProduto')?.value;

      if(selectedProduto){
        this.selectedProdutos.push({
          descricao: selectedProduto.descricao,
          produtoId: selectedProdutoId,
          quantidadeProduto: selectedQuantity
        });

        this.dataSource = new MatTableDataSource(this.selectedProdutos);
      }else{
        console.error('Selected produto nof found.');
      }
    }else{
      console.error('Form is invalid or no produtos are selected.');
    }   
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

  //deleteProdutoFromTable()

}
