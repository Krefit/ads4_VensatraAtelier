import { HttpResponse } from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AnimationController, ToastController} from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import {ProdutoModel} from '../model/produto-model';
import { MyCartService } from '../services/my-cart.service';
import { ProdutoServiceService } from '../services/produto-service.service';
import {SharedDataServiceService} from '../services/shared-data-service.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.page.html',
  styleUrls: ['./item-details.page.scss'],
})
export class ItemDetailsPage implements OnInit {
  selectedSize: number;
  selectedColor: number;
  activeVariation: string;
  produto?: ProdutoModel;
  produtos?: ProdutoModel[];
  cart = [];
  defaultSize: number;
  defaultColor: number;
  contadorItemCarrinho: BehaviorSubject<number>;
  constructor(
      private animatioCntrl: AnimationController,
      private route: ActivatedRoute,
      private sharedDataService: SharedDataServiceService,
      private cartService: MyCartService,
      private produtoService: ProdutoServiceService,
      private toastController: ToastController
  ) { }

  async ngOnInit() {
    this.activeVariation = 'size';

    this.sharedDataService.produtoData$.subscribe(data => {
      this.produto = data;

    });
  }

  adicionarAoCarrinho() {
    if (this.produto) {
      const existingItem = this.cartService.getCartItems().find(item => item.produto.id === this.produto?.id);

      if (existingItem) {
        existingItem.quantidade += 1;
      } else {
        let defaultSize: number;
        let defaultColor: number;

        // Lógica para definir o tamanho padrão (exemplo: 1 para pequeno)
        defaultSize = 1;

        // Lógica para definir a cor padrão (exemplo: 1 para vermelho)
        defaultColor = 1;

        this.cartService.addToCart(this.produto, defaultSize);
      }

      this.presentToast('Produto adicionado ao carrinho.');
    }
  }



  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  segmentChanged(e: any) {
    this.activeVariation = e.detail.value;

    if (this.activeVariation === 'color') {
      this.animatioCntrl.create()
      .addElement(document.querySelector('.sizes'))
      .duration(500)
      .iterations(1)
      .fromTo('transform', 'translateX(0px)', 'translateX(100%)')
      .fromTo('opacity', '1', '0.2')
      .play();

      this.animatioCntrl.create()
      .addElement(document.querySelector('.colors'))
      .duration(500)
      .iterations(1)
      .fromTo('transform', 'translateX(-100%)', 'translateX(0)')
      .fromTo('opacity', '0.2', '1')
      .play();
    } else {
      this.animatioCntrl.create()
      .addElement(document.querySelector('.sizes'))
      .duration(500)
      .iterations(1)
      .fromTo('transform', 'translateX(100%)', 'translateX(0)')
      .fromTo('opacity', '0.2', '1')
      .play();

      this.animatioCntrl.create()
      .addElement(document.querySelector('.colors'))
      .duration(500)
      .iterations(1)
      .fromTo('transform', 'translateX(0px)', 'translateX(-100%)')
      .fromTo('opacity', '1', '0.2')
      .play();
    }
  }

  changeSize(size: number) {
    this.selectedSize = size;
  }

  changeColor(color: number) {
    this.selectedColor = color;
  }

}
