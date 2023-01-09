import { TestBed } from '@angular/core/testing';

import { TelpHistoryService } from './telp-history.service';

describe('TelpHistoryService', () => {
  let service: TelpHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TelpHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
