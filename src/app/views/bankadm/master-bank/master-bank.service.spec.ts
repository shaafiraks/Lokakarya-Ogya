import { TestBed } from '@angular/core/testing';

import { MasterBankService } from './master-bank.service';

describe('MasterBankService', () => {
  let service: MasterBankService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterBankService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
