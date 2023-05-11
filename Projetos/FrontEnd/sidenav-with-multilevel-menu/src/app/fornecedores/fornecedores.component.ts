import { Component, OnInit } from '@angular/core';
import { FornecedorServicesService } from '../sidenav/services/fornecedor-services.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-media',
  templateUrl: './fornecedores.component.html',
  styleUrls: ['./fornecedores.component.scss']
})
export class FornecedoresComponent implements OnInit {
fornForm: FornGroup;


fornecedores: string[] = [
  'Nome',
  'CNPJ',
  'Endereco',
  'Telefone',
  'Estado',
  'Cidade',
];

constructor(
  private _fb: FormBuilder,
  private _forService: FornecedorServicesService,
  private _dialogRef: MatDialogRef<FornecedoresComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private _coreService: CoreService
) {
  this.fornForm = this._fb.group({
    nome: '',
    cnpj: '',
    endereco: '',
    telefone: '',
    estado: '',
    cidade: '',
  });
}

  ngOnInit(): void {
    this.fornForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.fornForm.valid) {
      if (this.data) {
        this._forService
          .updateFornecedor(this.data.id, this.fornForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Fornecedor detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._forService.addFornecedor(this.fornForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Fornecedor added successfully');
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

