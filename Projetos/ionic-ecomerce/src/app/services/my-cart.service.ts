import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ProdutoModel} from '../model/produto-model';

@Injectable({
  providedIn: 'root'
})
export class MyCartService {

  private clienteData: { nome: string; endereco: string } | null = null;
  private readonly localStorageKey = 'myCart';
  private cart: { produto: ProdutoModel; quantidade: number }[] = [];
  private cartSubject = new BehaviorSubject<{ produto: ProdutoModel; quantidade: number }[]>([]);
  private totalItemsSubject = new BehaviorSubject<number>(0);
  totalItems$ = this.totalItemsSubject.asObservable();

  constructor() {
    this.loadCartFromLocalStorage();
    this.updateTotalItems();
  }

  addToCart(produto: ProdutoModel, quantidade: number) {
    const existingItem = this.cart.find(
        item => item.produto.id === produto.id);

    if (existingItem) {
      existingItem.quantidade += 1;
      if (existingItem.quantidade <= 0) {
        this.removeFromCart(existingItem);
      }
    } else {
      // Se não estiver no carrinho, adicione um novo item
      this.cart.push({
        produto,
        quantidade: 1,
      });
    }
    this.saveCartToLocalStorage();
    this.updateTotalItems();
  }

  private updateTotalItems() {
    const totalItems = this.cart.reduce((total, item) => total + item.quantidade, 0);
    this.totalItemsSubject.next(totalItems);
  }

  updateCart(produto: ProdutoModel, newQuantity: number) {
    const existingItem = this.cart.find(item => item.produto.id === produto.id);

    if (existingItem) {
      existingItem.quantidade = newQuantity;
      this.saveCartToLocalStorage();
      this.cartSubject.next([...this.cart]);
    }
  }

  private loadCartFromLocalStorage() {
    const cartData = localStorage.getItem(this.localStorageKey);
    if (cartData) {
      this.cart = JSON.parse(cartData);
    }
  }

  getAllCartData() {
    return {
      cliente: this.getClienteData(),
      produtos: this.getCartItems(),
      // Adicione outros dados necessários do carrinho
    };
  }

  private saveCartToLocalStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cart));
  }

  getCartItemsCopy(): { produto: ProdutoModel; quantidade: number }[] {
    return [...this.cart]; // Retorna uma cópia dos itens do carrinho
  }

  getCartItems(): { produto: ProdutoModel; quantidade: number }[] {
    return this.cart;
  }

  removeFromCart(item: { produto: ProdutoModel; quantidade: number }) {
    const index = this.cart.findIndex(cartItem => cartItem === item);
    if (index !== -1) {
      this.cart.splice(index, 1);
    }
    this.saveCartToLocalStorage();
    this.updateTotalItems();
  }

  clearCart() {
    this.cart = [];
    this.saveCartToLocalStorage();
    this.cartSubject.next([...this.cart]); // Notifica observadores sobre a atualização no carrinho
  }

  getTotalPrice(): number {
    return this.cart.reduce((total, item) =>
        total + (item.produto.preco * item.quantidade), 0);
  }

  setClienteData(nome: string, endereco: string) {
    this.clienteData = {nome, endereco};
  }

  getClienteData(): { nome: string; endereco: string } | null {
    return this.clienteData;
  }

  getSubtotal(item: { produto: ProdutoModel; quantidade: number }): number {
    return item.produto.preco * item.quantidade;
  }
}
