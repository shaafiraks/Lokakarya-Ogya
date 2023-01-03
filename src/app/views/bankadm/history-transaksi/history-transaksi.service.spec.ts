import { TestBed } from '@angular/core/testing';

import { HistoryTransaksiService } from './history-transaksi.service';

describe('HistoryTransaksiService', () => {
  let service: HistoryTransaksiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoryTransaksiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
