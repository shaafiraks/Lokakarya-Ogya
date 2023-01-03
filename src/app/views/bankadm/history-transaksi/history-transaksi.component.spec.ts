import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryTransaksiComponent } from './history-transaksi.component';

describe('HistoryTransaksiComponent', () => {
  let component: HistoryTransaksiComponent;
  let fixture: ComponentFixture<HistoryTransaksiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryTransaksiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryTransaksiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
