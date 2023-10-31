import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { CoreService } from "../../services/core.service";
import { ProdutoService } from "../../services/produto.service";
import { MaterialService } from 'src/app/services/material.service';
import { FornecedoresService } from 'src/app/services/fornecedores.service';

@Component({
  selector: 'app-produto-editar',
  templateUrl: './produto-editar.component.html',
  styleUrls: ['./produto-editar.component.scss']
})
export class ProdutoEditarComponent implements OnInit {
  empForm!: FormGroup;
  materials: any[] = [];
  fornecedor: any[] = [];

  constructor(
    private _fb: FormBuilder,
    private _empService: ProdutoService,
    private _dialogRef: MatDialogRef<ProdutoEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService,
    private _materialService: MaterialService,
    private _fornService: FornecedoresService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadMaterials();
    this.loadFornecedor();
    if (this.data) {
      this.empForm.patchValue(this.data);
    }
  }

  initializeForm(): void {
    this.empForm = this._fb.group({
      ProdID: [0],
      prodCategoria: ['', Validators.required],
      prodDescricao: ['', Validators.required],
      prodIdMaterial: [0, Validators.required],
      prodQtdMaterial: [0, [Validators.required, Validators.min(1)]],
      prodTempoMaoObra: [0],
      prodCustoExtra: [0],
      prodProcentLucro: [0],
      prodIdFornecedor: [0, Validators.required],
    });
  }

  loadMaterials(): void {
    this._materialService.list().subscribe((materials) => {
      this.materials = materials;
    });
  }

  loadFornecedor(): void {
    this._fornService.getFornecedorList().subscribe((fornecedor) => {
      this.fornecedor = fornecedor;
    });
  }

  onFormSubmit(): void {
    if (this.empForm.valid) {
      if (this.data) {
        this._empService.updateProduto(this.data.prodId, this.empForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Produto editado com sucesso!');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      } else {
        this._empService.addProduto(this.empForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Produto adicionado com sucesso!');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }

  deleteProduto(): void {
    if (this.data) {
      this._empService.deleteProduto(this.data.prodId).subscribe({
        next: (val: any) => {
          this._coreService.openSnackBar('Produto excluído com sucesso!');
          this._dialogRef.close(true);
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    }
  }
}
