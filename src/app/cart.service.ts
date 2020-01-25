import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private data = [
    {
      category: 'Ice-cream',
      expanded: true,
      products: [
        {id: 0, name: 'กระทิ', price: '80'},
        {id: 1, name: 'ช๊อคโกแล๊ต', price: '100'},
        {id: 2, name: 'สลิ่ม', price: '100'}
      ]
    },
    {
      category: 'Gadgets',
      products: [
        {id: 3, name: 'กรวย', price: '45'},
        {id: 4, name: 'ขนมปัง', price: '90'},
        {id: 5, name: 'ถ้วย & ช้อน', price: '100'}
      ]
    }
  ]

  private cart = [];

  constructor() { }

  getProducts() {
    return this.data;
  }

  getCart() {
    return this.cart;
  }

  addProduct(product) {
    this.cart.push(product);
  }

}
