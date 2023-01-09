import { TestBed } from '@angular/core/testing';

import { TransaksiNasabahService } from './transaksi-nasabah.service';

describe('TransaksiNasabahService', () => {
  let service: TransaksiNasabahService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransaksiNasabahService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
