import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatTable } from '@angular/material/table';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialog } from "@angular/material/dialog";
import { CoreService } from "../../services/core.service";
import { ProdutoEditarComponent } from "../produto-editar/produto-editar.component";
import { ProdutoService } from "../../services/produto.service";
import { forkJoin } from 'rxjs';
import { MaterialService } from 'src/app/services/material.service';


@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.scss']
})
export class ProdutoListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'descricao',
    //'categoria',
    //'idMaterial',
    //'material',
    //'qtdMaterial',
    //'tempoMaoObra',
    //'custoExtra',
    //'procentLucro',
    //'idFornecedor',
    //'fornecedor',
    //'expandedDetail',
    'material',
    'action',

  ];
  panelOpenState = false;
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;
  arrayProduto: any[]=[];
  arrayMateriais: any[]=[];

  constructor(
    private _dialog: MatDialog,
    private _prodService: ProdutoService,
    private _coreService: CoreService,
    // private _fornService: FornecedoresService,
    private _matService: MaterialService
  ) { }

  ngOnInit(): void {
    // Set up sorting and pagination configurations


    this.getProdutoListar();
  }

  openAddEditEmpForm() {
    const dialogRef
      = this._dialog.open(ProdutoEditarComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getProdutoListar();
        }
      },
    });
  }



  // toggleExpansion(row: any) {
  //   row.expanded = !row.expanded;

  //   if (row.expanded) {
  //     console.log('Row:', row);
  //     console.log('Materials:', row.materiais);
  //     // Rest of your code
  //   }
  
  //   if (row.expanded) {
  //     // Ensure 'materiais' is initialized even if it's an empty array
  //     row.materiais = row.materiais || [];
  //     row.materialsDataSource = new MatTableDataSource(row.materiais);
  //   }
  // }

  // isDefaultRow = (index: number, row: any) => {
  //   return row.expanded; // Define the condition that makes a row the default one
  // };




  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteProduto(id: number) {
    if (id != null) {
      this._prodService.deleteProduto(id).subscribe({
        next: (res) => {
          this._coreService.openSnackBar('Produto Excluido!', 'done');
          this.getProdutoListar();
        },
        error: console.log,
      });
    }
  }


  openEditForm(row: any) {
    const dialogRef = this._dialog.open(ProdutoEditarComponent, {
      data: row, // Pass the entire row object to the dialog
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getProdutoListar();
        }
      },
    });
  }

  getProdutoListar() {

    this._prodService.getProdutoList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

        console.log('res');
          console.log(res);

        //Trazer dados de outra tabela
        this._matService.list().subscribe((materialArray: any[]) => {
          console.log('materialArray');
          console.log(materialArray);

          this.dataSource.data = this.dataSource.data.map((row: any) => {
            const materialIds = row.materiais.map((pm: any) => pm.materialId);
            console.log('materialIds');
            console.log(materialIds);

            const materials = row.materiais
              .map((pm: any) => {
                const material = materialArray.find((m: any) => m.materialId === pm.id);
                console.log('material');
                console.log(material);
                return material ? material.descricao : ''; // Return the descricao or an empty string if not found
              });
            console.log('materials');
            console.log(materials);
          });
        });

      },
      error: console.log,
    });
  }

  // Inside getProdutoListar()
// getProdutoListar() {
//   forkJoin({
//     produtos: this._prodService.getProdutoList(),
//     materiais: this._matService.list()
//   }).subscribe({
//     next: (result: any) => {
//       const produtos = result.produtos;
//       const materiais = result.materiais;

//       const materialsMap = new Map();
//       materiais.forEach((material: any) => {
//         materialsMap.set(material.id, material); // Assuming 'id' is the unique identifier
//       });

//       produtos.forEach((product: any) => {
//         if (product.materiais && product.materiais.length > 0) {
//           const materials = product.materiais.map((pm: any) => {
//             const material = materialsMap.get(pm.materialId);
//             return material ? { descricao: material.descricao, quantidade: pm.quantidade } : null;
//           });
//           product.materiais = materials.filter((material: any) => material !== null);
//         } else {
//           product.materiais = [];
//         }
//       });

//       this.dataSource = new MatTableDataSource(produtos);
//       this.dataSource.sort = this.sort;
//       this.dataSource.paginator = this.paginator;
//     },
//     error: console.error,
//   });
// }

}
