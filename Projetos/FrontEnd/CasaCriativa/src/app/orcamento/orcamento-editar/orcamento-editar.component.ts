import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators } from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CoreService} from "../../services/core.service";
import {OrcamentosService} from "../../services/orcamentos.service";
import { ClienteService } from 'src/app/services/cliente.service';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-orcamento-editar',
  templateUrl: './orcamento-editar.component.html',
  styleUrls: ['./orcamento-editar.component.scss']
})
export class OrcamentoEditarComponent {
  empForm: FormGroup;
  produtos: any[] = [];
  clientes: any[] = [];

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
      orcaIDCliente: ['', Validators.required], // Add validation rule for required field
      orcaDtInicioProd: ['', Validators.required], // Add validation rule for required field
      orcaDesconto: [0, Validators.required], // Add validation rule for required field
      orcaDtEntrega: ['', Validators.required], // Add validation rule for required field
      orcaIDProduto: ['', Validators.required], // Add validation rule for required field
      orcaQtdProduto: [0, Validators.required]
    });
  }
  ngOnInit(): void {
    this.empForm.patchValue(this.data);
    this.loadCliente();
    this.loadProduto();

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
