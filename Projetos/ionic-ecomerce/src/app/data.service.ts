import { Injectable } from '@angular/core';

// Category Interface
export interface ICategory {
  id: number;
  name: string;
  image: string;
}
// Product Interface
export interface IProduct {
  id: number;
  name: string;
  price: number;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getCategories() {
    const categories = [];
    const cat1: ICategory = {
      id: 1,
      name: 'Canecas',
      image: '../../assets/categories/category-1.jpg'
    };
    const cat2: ICategory = {
      id: 2,
      name: 'Bebes',
      image: '../../assets/categories/category-2.jpeg'
    };
    const cat3: ICategory = {
      id: 3,
      name: 'Kids',
      image: '../../assets/categories/category-3.png'
    };

    categories.push(cat1, cat2, cat3);

    return categories;
  }

  getFeaturedProducts() {
    const products = [];

    const prod1: IProduct = {
      id: 1,
      name: 'Womens T-Shirt',
      price: 55,
      image: '../../assets/products/prod-1.png'
    };
    const prod2: IProduct = {
      id: 2,
      name: 'Mens T-Shirt',
      price: 34,
      image: '../../assets/products/prod-2.png'
    };
    const prod3: IProduct = {
      id: 1,
      name: 'Womens T-Shirt',
      price: 40,
      image: '../../assets/products/prod-3.png'
    };

    products.push(prod1, prod2, prod3);

    return products;
  }

  getBestSellProducts() {
    const products = [];

    const prod1: IProduct = {
      id: 1,
      name: 'Womens T-Shirt',
      price: 55,
      image: '../../assets/products/prod-4.png'
    };
    const prod2: IProduct = {
      id: 2,
      name: 'Mens T-Shirt',
      price: 34,
      image: '../../assets/products/prod-5.png'
    };
    const prod3: IProduct = {
      id: 1,
      name: 'Womens T-Shirt',
      price: 40,
      image: '../../assets/products/prod-6.png'
    };

    products.push(prod1, prod2, prod3);

    return products;
  }
}
