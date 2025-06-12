import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Dessert } from '../../model/dessert';
import { ProductCardService } from '../../services/product-card.service';
import { AddToCartComponent } from '../add-to-cart/add-to-cart.component';


@Component({
  selector: 'app-product-card',
  imports: [CommonModule, AddToCartComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
   desserts: Dessert[] = [];

  constructor(private productCardService: ProductCardService) {}

   ngOnInit() {
    this.productCardService.getProducts().subscribe(data => {
      this.desserts = data;
    });
  }

}
