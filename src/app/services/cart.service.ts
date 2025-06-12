import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Dessert, CartItems } from '../model/dessert';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItems[] = [];
  private cartSubject = new BehaviorSubject<CartItems[]>(this.cartItems);
  cart$ = this.cartSubject.asObservable();

  constructor() {}

  addDessertToCart(dessert: Dessert): void {
    const index = this.cartItems.findIndex(item => item.name === dessert.name);

    if (index !== -1) {
      this.cartItems[index].quantity += 1;
      this.cartItems[index].subTotalPrice = this.cartItems[index].quantity * dessert.price;
    } else {
      this.cartItems.push({
        ...dessert,
        quantity: 1,
        subTotalPrice: dessert.price
      });
    }

    this.cartSubject.next(this.cartItems);
  }

  getCartItems(): CartItems[] {
    return this.cartItems;
  }

  getTotalItems(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  getOrderTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.subTotalPrice, 0);
  }

  removeDessertFromCart(dessert: CartItems): void {
    const index = this.cartItems.findIndex(item => item.name === dessert.name);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.cartSubject.next(this.cartItems);
    }
  }

  clearCart(): void {
    this.cartItems = [];
    this.cartSubject.next(this.cartItems);
  }
}