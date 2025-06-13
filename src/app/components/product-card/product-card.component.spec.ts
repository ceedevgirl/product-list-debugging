import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCardComponent } from './product-card.component';
import { ProductCardService } from '../../services/product-card.service';
import { of } from 'rxjs';
import { Dessert } from '../../model/dessert';
import { AddToCartComponent } from '../add-to-cart/add-to-cart.component';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;
  let mockService: jasmine.SpyObj<ProductCardService>;

  const mockDesserts: Dessert[] = [
    {
      image: {
        thumbnail: 'images/image-waffle-thumbnail.jpg',
        mobile: 'images/image-waffle-mobile.jpg',
        tablet: 'images/image-waffle-tablet.jpg',
        desktop: 'images/image-waffle-desktop.jpg',
      },
      name: 'Waffle with Berries',
      category: 'Waffle',
      price: 6.5
    }
  ];

  beforeEach(async () => {
    const serviceSpy = jasmine.createSpyObj('ProductCardService', ['getProducts']);

    await TestBed.configureTestingModule({
      imports: [CommonModule, ProductCardComponent, AddToCartComponent],
      providers: [{ provide: ProductCardService, useValue: serviceSpy }]
    }).compileComponents();

    mockService = TestBed.inject(ProductCardService) as jasmine.SpyObj<ProductCardService>;
    mockService.getProducts.and.returnValue(of(mockDesserts));

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getProducts and populate desserts', () => {
    expect(mockService.getProducts).toHaveBeenCalled();
    expect(component.desserts.length).toBe(1);
    expect(component.desserts[0].name).toBe('Waffle with Berries');
  });

  it('should render dessert name and price in the template', () => {
    const nameEl = fixture.debugElement.query(By.css('.name')).nativeElement;
    const priceEl = fixture.debugElement.query(By.css('.price')).nativeElement;

    expect(nameEl.textContent).toContain('Waffle with Berries');
    expect(priceEl.textContent).toContain('$6.5');
  });
});
