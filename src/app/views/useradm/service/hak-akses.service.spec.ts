import { TestBed } from '@angular/core/testing';

import { HakAksesService } from './hak-akses.service';

describe('HakAksesService', () => {
  let service: HakAksesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HakAksesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
