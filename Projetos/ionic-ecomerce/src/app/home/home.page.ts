import {Component, OnInit} from '@angular/core';
import {DataService} from '../data.service';
import {ProdutoModel} from '../model/produto-model';
import {HttpResponse} from '@angular/common/http';
import {ProdutoServiceService} from '../services/produto-service.service';
import {NavController, ToastController} from '@ionic/angular';
import {Router} from '@angular/router';
import {SharedDataServiceService} from '../services/shared-data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public categories = [];

  public bestSellProducts = [];
  produtoList?: ProdutoModel[];
  filtroPrecoMaximo: number;


  constructor(
      private data: DataService,
      private produtoService: ProdutoServiceService,
      private toastController: ToastController,
      private navCtrl: NavController,
      private router: Router,
      private sharedDataService: SharedDataServiceService
  ) {
  }

  ngOnInit() {
    this.categories = this.data.getCategories();
    this.bestSellProducts = this.data.getBestSellProducts();
    this.filtrarProdutosMaisBaratos();
    this.listarProdutos();
  }
  filtrarProdutosMaisBaratos() {
    // Defina um preço máximo, por exemplo, R$ 10,00. Ajuste conforme necessário.
    this.filtroPrecoMaximo = 5;
  }
  navigateToItemDetails(product: ProdutoModel) {
    this.sharedDataService.setProdutoData(product);
    this.router.navigate(['/item-details']);
  }



  // produtoList?: ProdutoModel[];
  // constructor(
  //   private produtoService: ProdutoServiceService,
  //   private toastController: ToastController,
  //   private alertCntrl: AlertController,
  //   private vacCtrl: NavController
  // ) { }
  //
  // ngOnInit() {
  //   this.listarProdutos();
  // }
  listarProdutos() {
    this.produtoService.listarProduto().subscribe(async (produtoList: HttpResponse<ProdutoModel[]>) => {
      this.produtoList = produtoList.body ?? [];
      console.log(this.produtoList);
      const toast = await this.toastController.create({
        message: 'Produto Listado com sucesso',
        duration: 3000
      });
      return await toast.present;
    });
  }

}
