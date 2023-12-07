import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CartIconPage } from './cart-icon.page';

describe('CartIconPage', () => {
  let component: CartIconPage;
  let fixture: ComponentFixture<CartIconPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartIconPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CartIconPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
