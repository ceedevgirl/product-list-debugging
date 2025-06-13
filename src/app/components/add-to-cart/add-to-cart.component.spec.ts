import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AddToCartComponent } from './add-to-cart.component';
import { CartService } from '../../services/cart.service';
import { Dessert } from '../../model/dessert';

describe('AddToCartComponent', () => {
  let component: AddToCartComponent;
  let fixture: ComponentFixture<AddToCartComponent>;
  let mockCartService: jasmine.SpyObj<CartService>;

  const mockDessert: Dessert = {
    image: {
      thumbnail: 'images/image-waffle-thumbnail.jpg',
      mobile: 'images/image-waffle-mobile.jpg',
      tablet: 'images/image-waffle-tablet.jpg',
      desktop: 'images/image-waffle-desktop.jpg'
    },
    name: 'Waffle with Berries',
    category: 'Waffle',
    price: 6.5
  };

  beforeEach(async () => {
    const cartSpy = jasmine.createSpyObj('CartService', ['addDessertToCart']);

    await TestBed.configureTestingModule({
      imports: [AddToCartComponent], // Use imports for standalone components
      providers: [
        { provide: CartService, useValue: cartSpy }
      ]
    }).compileComponents();

    mockCartService = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
    fixture = TestBed.createComponent(AddToCartComponent);
    component = fixture.componentInstance;
    component.dessert = mockDessert;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call cartService.addDessertToCart the correct number of times', () => {
    mockCartService.addDessertToCart.calls.reset();
    
    component.quantity = 3;
    component.addToCart();
    
    expect(mockCartService.addDessertToCart).toHaveBeenCalledTimes(3);
    expect(mockCartService.addDessertToCart).toHaveBeenCalledWith(mockDessert);
  });

  it('should increase quantity', () => {
    component.quantity = 2;
    component.increaseProductItem();
    expect(component.quantity).toBe(3);
  });

  it('should decrease quantity but not below 1', () => {
    component.quantity = 2;
    component.decreaseProductItem();
    expect(component.quantity).toBe(1);

    component.decreaseProductItem();
    expect(component.quantity).toBe(1);
  });

  it('should show confirmation then hide it after 2 seconds', fakeAsync(() => {
    mockCartService.addDessertToCart.calls.reset();
    
    expect(component.addedConfirmation).toBeFalse();
    
    component.addToCart();
    expect(component.addedConfirmation).toBeTrue();

    tick(2000);
    expect(component.addedConfirmation).toBeFalse();
  }));
});