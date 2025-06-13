import { Component, Input } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Dessert } from '../../model/dessert';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-to-cart',
  imports: [CommonModule],
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']  
})
export class AddToCartComponent {
  @Input() dessert!: Dessert; 

  // isAddedToCart = false;
  quantity = 1;
  addedConfirmation = false;

  constructor(private cartService: CartService) {}

  addToCart() {
    for (let i = 0; i < this.quantity; i++) {
      this.cartService.addDessertToCart(this.dessert);
    }
    // this.isAddedToCart = true;
    this.addedConfirmation = true; // Show confirmation
    setTimeout(() => {
      this.addedConfirmation = false; // Hide confirmation after a short delay
    }, 2000); // 
  }

  increaseProductItem() {
    this.quantity++;
  }

  decreaseProductItem() {
    if (this.quantity > 1) {
      this.quantity--;
    } else {
      // this.isAddedToCart = false;
      this.quantity = 1;
    }
  }
}
