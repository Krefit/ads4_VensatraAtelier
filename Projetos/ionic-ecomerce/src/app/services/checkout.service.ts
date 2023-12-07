import { Injectable } from '@angular/core';
import {ProdutoModel} from '../model/produto-model';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private cartItems = new BehaviorSubject<{ produto: ProdutoModel; quantidade: number }[]>([]);
  cartItems$ = this.cartItems.asObservable();
  private readonly localStorageKey = 'checkoutCart';
  constructor() {}

  setCartItems(data: { produto: ProdutoModel; quantidade: number }[]) {
    this.cartItems.next(data);
  }

  getCartItemsCopy(): { produto: ProdutoModel; quantidade: number }[] {
    return [...this.cartItems.getValue()];
  }

  clearCartItems() {
    this.cartItems.next([]);
  }
}
