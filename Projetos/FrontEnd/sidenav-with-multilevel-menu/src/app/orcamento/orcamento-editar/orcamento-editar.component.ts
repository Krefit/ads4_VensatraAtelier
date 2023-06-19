import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CoreService} from "../../services/core.service";
import {OrcamentosService} from "../../services/orcamentos.service";

@Component({
  selector: 'app-orcamento-editar',
  templateUrl: './orcamento-editar.component.html',
  styleUrls: ['./orcamento-editar.component.scss']
})
export class OrcamentoEditarComponent {
  empForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _orcamentoService: OrcamentosService,
    private _dialogRef: MatDialogRef<OrcamentoEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.empForm = this._fb.group({
      orcaID: "",
      orcaIDCliente: "",
      orcaDtInicioProd: "",
      orcaDtEntrega: "",
      orcaIDProduto: "",
      orcaQtdProduto: "",
      orcaDesconto: "",
    });
  }
  ngOnInit(): void {
    this.empForm.patchValue(this.data);
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
