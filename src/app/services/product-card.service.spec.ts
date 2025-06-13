import { TestBed } from '@angular/core/testing';
import { ProductCardService } from './product-card.service';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { Dessert } from '../model/dessert';

describe('ProductCardService', () => {
  let service: ProductCardService;
  let httpTestingController: HttpTestingController;

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
      price: 6.5,
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductCardService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });

    service = TestBed.inject(ProductCardService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch products via GET', () => {
    service.getProducts().subscribe((desserts) => {
      expect(desserts.length).toBe(1);
      expect(desserts[0].name).toBe('Waffle with Berries');
      expect(desserts).toEqual(mockDesserts);
    });

    const req = httpTestingController.expectOne('data.json');
    expect(req.request.method).toEqual('GET');
    req.flush(mockDesserts);
  });

  afterEach(() => {
    httpTestingController.verify(); // Ensure no pending requests
  });
});
