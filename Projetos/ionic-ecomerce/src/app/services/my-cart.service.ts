import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable } from 'rxjs';
import { ProdutoModel } from '../model/produto-model';

@Injectable({
  providedIn: 'root'
})
export class MyCartService {

  private clienteData: { nome: string; endereco: string } | null = null;
  private readonly localStorageKey = 'myCart';
  private cart: { produto: ProdutoModel; quantidade: number }[] = [];
  private cartSubject = new BehaviorSubject<{ produto: ProdutoModel; quantidade: number }[]>([]);


  constructor() {
    this.loadCartFromLocalStorage();
  }

  addToCart(produto: ProdutoModel, quantidade: number) {
    // Adicione lógica para verificar se o produto já está no carrinho e atualizar a quantidade
    const existingItem = this.cart.find(
        item => item.produto.id === produto.id);

    if (existingItem) {
      existingItem.quantidade += 1;
    } else {
      // Se não estiver no carrinho, adicione um novo item
      this.cart.push({
        produto,
        quantidade: 1,
      });
    }
    this.saveCartToLocalStorage();
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

  private saveCartToLocalStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cart));
  }

  getCartItems(): { produto: ProdutoModel; quantidade: number }[] {
    return this.cart;
  }
  removeFromCart(item: { produto: ProdutoModel; quantidade: number }) {
    const index = this.cart.findIndex(cartItem => cartItem === item);
    if (index !== -1) {
      this.cart.splice(index, 1);
      this.saveCartToLocalStorage();
      this.cartSubject.next([...this.cart]); // Notifica observadores sobre a atualização no carrinho
    }
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
    this.clienteData = { nome, endereco };
  }

  getClienteData(): { nome: string; endereco: string } | null {
    return this.clienteData;
  }
}
