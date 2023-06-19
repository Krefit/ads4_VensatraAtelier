import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrcamentoListComponent } from './orcamento-list.component';

describe('OrcamentoListComponent', () => {
  let component: OrcamentoListComponent;
  let fixture: ComponentFixture<OrcamentoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrcamentoListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrcamentoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
