import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CoreService} from "../../services/core.service";
import {ClienteService} from "../../services/cliente.service";

@Component({
  selector: 'app-cliente-editar',
  templateUrl: './cliente-editar.component.html',
  styleUrls: ['./cliente-editar.component.scss']
})
export class ClienteEditarComponent {
  empForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _empService: ClienteService,
    private _dialogRef: MatDialogRef<ClienteEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.empForm = this._fb.group({
      cliID: "",
      cliNome: "",
      cliCPF_CNPJ: "",
      cliEndereco: "",
      cliDtNascimento: "",
      cliEmail: "",
      cliTelefone: "",
    });
  }
  ngOnInit(): void {
    this.empForm.patchValue(this.data);

    // Verifica se o objeto data está definido e possui a propriedade cliDtNascimento
    if (this.data && this.data.cliDtNascimento) {
      const dataNascimento = this.data.cliDtNascimento;
      const dataFormatada = new Date(dataNascimento).toLocaleString("pt-BR");
      this.empForm.get('cliDtNascimento')?.setValue(dataFormatada);
    }
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this._empService
          .updateCliente(this.data.cliID, this.empForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Cliente editado com sucesso!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
        console.log(this.empForm.value);
      } else {
        this._empService.addCliente(this.empForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Cliente adicionado com sucesso!');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });

      }
    }
  }
  deleteCliente() {
    if (this.data) {
      this._empService.deleteCliente(this.data.cliID).subscribe({
        next: (val: any) => {
          this._coreService.openSnackBar('Cliente excluído com sucesso!');
          this._dialogRef.close(true);
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    }
  }
}
