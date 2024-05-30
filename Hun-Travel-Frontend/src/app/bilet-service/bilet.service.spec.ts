import { TestBed } from '@angular/core/testing';

import { BiletService } from './bilet.service';

describe('BiletService', () => {
  let service: BiletService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BiletService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
