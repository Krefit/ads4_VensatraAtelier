import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CoreService} from "../../services/core.service";
import {ProdutoService} from "../../services/produto.service";
import { MaterialService } from 'src/app/services/material.service';
import { FornecedoresService } from 'src/app/services/fornecedores.service';

@Component({
  selector: 'app-produto-editar',
  templateUrl: './produto-editar.component.html',
  styleUrls: ['./produto-editar.component.scss']
})
export class ProdutoEditarComponent {
  empForm: FormGroup;
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

  ) {
    this.empForm = this._fb.group({
      ProdID: "",
      prodCategoria: "",
      prodDescricao: "",
      prodIdMaterial: "",
      prodQtdMaterial: "",
      prodTempoMaoObra: "",
      prodCustoExtra: "",
      prodProcentLucro: "",
      prodIdFornecedor: "",
    });
  }
  ngOnInit(): void {
    this.empForm.patchValue(this.data);
    this.loadMaterials();
    this.loadFornecedor();

  }

  loadMaterials() {
    this._materialService.list().subscribe((materials) => {
      this.materials = materials;
    });
  }

  loadFornecedor(){
    this._fornService.getFornecedorList().subscribe((fornecedor) =>{
      this.fornecedor = fornecedor;
    })
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this._empService
          .updateProduto(this.data.ProdID, this.empForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('produto editado com sucesso!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
        console.log(this.empForm.value);
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
  deleteProduto() {
    if (this.data) {
      this._empService.deleteProduto(this.data.ProdID).subscribe({
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
