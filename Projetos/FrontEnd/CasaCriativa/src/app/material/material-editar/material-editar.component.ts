import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../../services/core.service';
import { MaterialService } from 'src/app/services/material.service';

@Component({
  selector: 'app-Material-editar',
  templateUrl: './material-editar.component.html',
  styleUrls: ['./material-editar.component.scss'],
})
export class MaterialEditarComponent {
  empForm: FormGroup;
  materials: any[] = [];
  fornecedor: any[] = [];

  constructor(
    private _fb: FormBuilder,
    private _empService: MaterialService,
    private _dialogRef: MatDialogRef<MaterialEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.empForm = this._fb.group({
      id: [''],
      descricao: ['', Validators.required],
      quantidade: [0, [Validators.required, Validators.min(1)]],
      preco: [0, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  onFormSubmit() {

    if (this.empForm.valid) {
      if (this.data) {
        this._empService
          .updateMaterial(this.data.matID, this.empForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Material editado com sucesso!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
        console.log(this.empForm.value);
      } else {
      console.log(this.empForm.value)
        this._empService.addMaterial(this.empForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Material adicionado com sucesso!');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }

  deleteMaterial() {
    if (this.data) {
      this._empService.deleteMaterial(this.data.matID).subscribe({
        next: (val: any) => {
          this._coreService.openSnackBar('Material excluído com sucesso!');
          this._dialogRef.close(true);
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    }
  }
}
