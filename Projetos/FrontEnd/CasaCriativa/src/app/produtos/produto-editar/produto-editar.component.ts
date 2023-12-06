import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { CoreService } from "../../services/core.service";
import { ProdutoService } from "../../services/produto.service";
import { MaterialService } from 'src/app/services/material.service';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-produto-editar',
  templateUrl: './produto-editar.component.html',
  styleUrls: ['./produto-editar.component.scss']
})
export class ProdutoEditarComponent implements OnInit {
  empForm!: FormGroup;
  materials: any[] = [];
  selectedMaterials: { materialId: number, descricao: string,  quantity: number }[] = [];
  prodIdMaterial: any;
  prodQtdMaterial: any;
  produtosMateriais: any[]=[];

  dataSource = new MatTableDataSource<{ materialId: number, descricao: string, quantity: number }>(this.selectedMaterials);

  displayedColumnsMaterial: string[]=[
    "materialId",
    "material",    
    "quantity",
    "actions"
  ]


  constructor(
    private _fb: FormBuilder,
    private _empService: ProdutoService,
    private _dialogRef: MatDialogRef<ProdutoEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService,
    private _materialService: MaterialService,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadMaterials();
    this.dataSource = this.data.materiais;
    if (this.data) {
      this.empForm.patchValue({
        ProdID: this.data.id,
        prodDescricao: this.data.descricao,
        // Other fields based on this.data properties
        materiais: this.data.materiais,
        produtosMateriais:  this.data.materiais,
      });
    }
    
  }

  initializeForm(): void {
    this.empForm = this._fb.group({
      ProdID: [0],
      prodDescricao: ['', Validators.required],
      prodIdMaterial: ['', Validators.required],
      prodQtdMaterial: ['', [Validators.required, Validators.min(1)]],
      produtosMateriais: ['', Validators.required],
      materiais: ['', Validators.required],
    });
  }

  loadMaterials(): void {
    this._materialService.list().subscribe((materials) => {
      this.materials = materials;
    });
  }


  onFormSubmit(): void {
    if (this.selectedMaterials.length > 0) {
      const produtoData = this.empForm.value;

      this._empService.addProdutoWithMaterials(produtoData, this.selectedMaterials).subscribe({
        next: (val: any) => {
          this._coreService.openSnackBar('Produto adicionado com sucesso!');
          this._dialogRef.close(true);
        },
        error: (err: any) => {
          console.error(err);
          // Handle error appropriately (display error message, log, etc.)
        },
      });
    } else {
      console.error('Form is invalid or no materials are selected.');
      this._coreService.openSnackBar('Adicione um material ao produto!');
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
  addMaterialToTable(): void {
    if (true) {
      const selectedMaterialId = this.empForm.get('prodIdMaterial')?.value;
      const selectedMaterial = this.materials.find(material => material.id === selectedMaterialId);
      const selectedQuantity = this.empForm.get('prodQtdMaterial')?.value;

      if (selectedMaterial) {
        this.selectedMaterials.push({
          descricao: selectedMaterial.descricao,
          materialId: selectedMaterialId,
          quantity: selectedQuantity
        });

        // Optionally, you can reset the form fields after adding the material
        this.dataSource  = new MatTableDataSource(this.selectedMaterials);
      } else {
        console.error('Selected material not found.'); // Log an error if the material isn't found
      }
    } else {
      console.log('Form is invalid. Cannot add material to the table.');
    }
  }

  deleteMaterialFromTable(index: number): void {
    if (index >= 0 && index < this.selectedMaterials.length) {
      this.selectedMaterials.splice(index, 1); // Remove the item at the specified index
      this.dataSource = new MatTableDataSource(this.selectedMaterials); // Update the table data source
    } else {
      console.error('Invalid index or item not found.');
    }
  }

  

}
