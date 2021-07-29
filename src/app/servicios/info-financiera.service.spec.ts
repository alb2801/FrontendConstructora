import { TestBed } from '@angular/core/testing';

import { InfoFinancieraService } from './info-financiera.service';

describe('InfoFinancieraService', () => {
  let service: InfoFinancieraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoFinancieraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
