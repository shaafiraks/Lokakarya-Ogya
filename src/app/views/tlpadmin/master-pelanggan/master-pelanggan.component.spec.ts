import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterPelangganComponent } from './master-pelanggan.component';

describe('MasterPelangganComponent', () => {
  let component: MasterPelangganComponent;
  let fixture: ComponentFixture<MasterPelangganComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterPelangganComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterPelangganComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
