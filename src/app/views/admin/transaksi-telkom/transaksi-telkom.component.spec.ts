import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransaksiTelkomComponent } from './transaksi-telkom.component';

describe('TransaksiTelkomComponent', () => {
  let component: TransaksiTelkomComponent;
  let fixture: ComponentFixture<TransaksiTelkomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransaksiTelkomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransaksiTelkomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
