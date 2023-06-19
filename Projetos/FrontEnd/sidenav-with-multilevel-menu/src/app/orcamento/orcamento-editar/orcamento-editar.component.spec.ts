import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrcamentoEditarComponent } from './orcamento-editar.component';

describe('OrcamentoEditarComponent', () => {
  let component: OrcamentoEditarComponent;
  let fixture: ComponentFixture<OrcamentoEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrcamentoEditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrcamentoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
