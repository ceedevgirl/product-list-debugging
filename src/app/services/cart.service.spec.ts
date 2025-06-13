import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { Dessert } from '../model/dessert';

describe('CartService', () => {
  let service: CartService;

  const sampleDessert: Dessert = {
    image: {
            thumbnail:'images/image-waffle-thumbnail.jpg',
            mobile:'images/image-waffle-mobile.jpg',
            tablet:'images/image-waffle-tablet.jpg',
            desktop:'images/image-waffle-desktop.jpg'
        },
       name:'Waffle with Berries',
       category:'Waffle',
       price: 6.50
    
  };


  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

   it('should add a dessert to the cart', () => {
    service.addDessertToCart(sampleDessert);
    const items = service.getCartItems();
    expect(items.length).toBe(1);
    expect(items[0].name).toBe('Waffle with Berries');
    expect(items[0].quantity).toBe(1);
    expect(items[0].subTotalPrice).toBe(6.5);
  });

  it('should increase quantity if the same dessert is added again', () => {
    service.addDessertToCart(sampleDessert);
    service.addDessertToCart(sampleDessert);
    const items = service.getCartItems();
    expect(items.length).toBe(1);
    expect(items[0].quantity).toBe(2);
    expect(items[0].subTotalPrice).toBe(13);
  });

  it('should return the total number of items', () => {
    service.addDessertToCart(sampleDessert);
    service.addDessertToCart(sampleDessert);
    expect(service.getTotalItems()).toBe(2);
  });

  it('should return the correct order total', () => {
    service.addDessertToCart(sampleDessert);
    service.addDessertToCart(sampleDessert);
    expect(service.getOrderTotal()).toBe(13);
  });

  it('should remove a dessert from the cart', () => {
    service.addDessertToCart(sampleDessert);
    const itemToRemove = service.getCartItems()[0];
    service.removeDessertFromCart(itemToRemove);
    expect(service.getCartItems().length).toBe(0);
  });

  it('should clear the cart', () => {
    service.addDessertToCart(sampleDessert);
    service.clearCart();
    expect(service.getCartItems().length).toBe(0);
    expect(service.getTotalItems()).toBe(0);
    expect(service.getOrderTotal()).toBe(0);
  });
});




