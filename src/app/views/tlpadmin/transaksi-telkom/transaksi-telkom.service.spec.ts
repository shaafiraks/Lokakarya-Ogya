import { TestBed } from '@angular/core/testing';

import { TransaksiTelkomService } from './transaksi-telkom.service';

describe('TransaksiTelkomService', () => {
  let service: TransaksiTelkomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransaksiTelkomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
