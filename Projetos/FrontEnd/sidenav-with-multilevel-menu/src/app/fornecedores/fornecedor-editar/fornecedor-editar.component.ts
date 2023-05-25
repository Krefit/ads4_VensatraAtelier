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

  fornecedor: string[] = [
    'id',
    'nome',
    'cnpj',
    'endereco',
    'telefone',
    'estado',
    'cidade',
    'action',
  ];

  constructor(
    private _fb: FormBuilder,
    private _empService: FornecedoresService,
    private _dialogRef: MatDialogRef<FornecedorEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.empForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      package: '',
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

