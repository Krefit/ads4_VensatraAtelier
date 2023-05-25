import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CoreService} from "../../services/core.service";
import {FornecedoresService} from "../../services/fornecedores.service";

@Component({
  selector: 'app-fornecedor-editar',
  templateUrl: './fornecedor-editar.component.html',
  styleUrls: ['./fornecedor-editar.component.scss']
})
export class FornecedorEditarComponent {
  empForm: FormGroup;

  estados: string[] = [
    'Acre',
    'Alagoas',
    'Amapá',
    'Amazonas',
    'Bahia',
    'Ceará',
    'Distrito Federal',
    'Espírito Santo',
    'Goiás',
    'Maranhão',
    'Mato Grosso',
    'Mato Grosso do Sul',
    'Minas Gerais',
    'Pará',
    'Paraíba',
    'Paraná',
    'Pernambuco',
    'Piauí',
    'Rio de Janeiro',
    'Rio Grande do Norte',
    'Rio Grande do Sul',
    'Rondônia',
    'Roraima',
    'Santa Catarina',
    'São Paulo',
    'Sergipe',
    'Tocantins'
  ];

  

  constructor(
    private _fb: FormBuilder,
    private _empService: FornecedoresService,
    private _dialogRef: MatDialogRef<FornecedorEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.empForm = this._fb.group({
      fornEstado: "",
      fornNome: "",
      fornEndereco: "",
      fornTelefone: "",
      fornCidade: "",
      fornCNPJ: ""
  });
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this._empService
          .updateFornecedor(this.data.id, this.empForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Fornecedor detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
          console.log(this.empForm.value);
      } else {
        this._empService.addFornecedor(this.empForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('FornecedorS added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}

