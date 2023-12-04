import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProdutoModel } from '../model/produto-model';
import { MyCartService } from '../services/my-cart.service';
import { ProdutoServiceService } from '../services/produto-service.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.page.html',
  styleUrls: ['./my-cart.page.scss'],
})
export class MyCartPage implements OnInit {
  cartItems: { produto: ProdutoModel; quantidade: number }[] = [];
  data?: ProdutoModel[];
  private cart = [];
  private cartItemCount = new BehaviorSubject(0);
  constructor(
      private cartService: MyCartService,
      private produtoService: ProdutoServiceService
  ) {}
  ngOnInit() {
    this.produtoService.listarProduto().pipe(
        map(response => response.body) // Extrai os dados da resposta
    ).subscribe(produtos => {
      // Agora, 'produtos' é do tipo ProdutoModel[]
      this.cartItems = this.cartService.getCartItems();
    });
  }
  increaseQuantity(item: { produto: ProdutoModel; quantidade: number }) {
    this.cartService.addToCart(item.produto, item.quantidade + 1);
    this.cartItems = this.cartService.getCartItems();
  }
  decreaseQuantity(item: { produto: ProdutoModel; quantidade: number }) {
    if (item.quantidade > 1) {
      this.cartService.updateCart(item.produto, item.quantidade - 1);
      this.cartItems = this.cartService.getCartItems();
    } else {
      this.cartService.removeFromCart(item);
      this.cartItems = this.cartService.getCartItems();
    }
  }
  getTotalPrice() {
    return this.cartItems.reduce((total, item) =>
        total + (item.produto.preco * item.quantidade), 0);
  }
  removeItem(item: { produto: ProdutoModel; quantidade: number }) {
    this.cartService.removeFromCart(item);
    this.cartItems = this.cartService.getCartItems();
  }
  private calculateTotalItems(cart: any[]): number {
    // Implemente a lógica para calcular o número total de itens no carrinho
    // Pode ser simplesmente a soma das quantidades de cada item no carrinho
    return cart.reduce((total, item) => total + item.quantidade, 0);
  }
  clearCart() {
    this.cartService.clearCart();
    this.cartItems = [];
  }
}
