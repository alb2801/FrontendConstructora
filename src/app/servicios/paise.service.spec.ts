import { TestBed } from '@angular/core/testing';

import { PaiseService } from './paise.service';

describe('PaiseService', () => {
  let service: PaiseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaiseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
