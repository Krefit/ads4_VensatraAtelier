import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TwoFactoryAuthPage } from './two-factory-auth.page';

describe('TwoFactoryAuthPage', () => {
  let component: TwoFactoryAuthPage;
  let fixture: ComponentFixture<TwoFactoryAuthPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoFactoryAuthPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TwoFactoryAuthPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
