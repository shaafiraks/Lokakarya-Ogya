import { TestBed } from '@angular/core/testing';

import { MasterPelangganService } from './master.service';

describe('MasterService', () => {
  let service: MasterPelangganService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterPelangganService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
