import { TestBed } from '@angular/core/testing';

import { FornecedorServicesService } from './fornecedor-services.service';

describe('FornecedorServicesService', () => {
  let service: FornecedorServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FornecedorServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
