import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { CartComponent } from './components/cart/cart.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('AppComponent', () => {

  let component: AppComponent;

  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({

      imports: [

        AppComponent,

        ProductCardComponent,

        CartComponent

      ],

      providers: [

        provideHttpClient(),

        provideHttpClientTesting(),

       

      ]

    })

    .compileComponents();

    fixture = TestBed.createComponent(AppComponent);

    component = fixture.componentInstance;

  });

  it('should create the app', () => {

    expect(component).toBeTruthy();

  });

  it(`should have the 'Product list' title`, () => {

    expect(component.title).toEqual('Product list');

  });

  it('should render the product card component', () => {

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('app-product-card')).toBeTruthy();

  });

  it('should render the cart component', () => {

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('app-cart')).toBeTruthy();

  });

});