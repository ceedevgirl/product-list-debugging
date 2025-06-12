import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItems } from '../../model/dessert';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
   imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: CartItems[] = [];
   confirmedItems: CartItems[] = [];
  totalItems = 0;
  orderTotal = 0;
  isOrderConfirmed = false;
  

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.totalItems = this.cartService.getTotalItems();
      this.orderTotal = this.cartService.getOrderTotal();
    });
  }

  removeItem(item: CartItems): void {
    this.cartService.removeDessertFromCart(item);
  }

  confirmOrder(): void {
     this.confirmedItems = [...this.cartItems];
    this.orderTotal = this.cartService.getOrderTotal(); 
    this.isOrderConfirmed = true;
    this.cartService.clearCart(); 
  }

  startNewOrder(): void {
    this.isOrderConfirmed = false;
    this.cartItems = [];
    this.orderTotal = 0; 
  }
}
