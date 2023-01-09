import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransaksiNasabahComponent } from './transaksi-nasabah.component';

describe('TransaksiNasabahComponent', () => {
  let component: TransaksiNasabahComponent;
  let fixture: ComponentFixture<TransaksiNasabahComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransaksiNasabahComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransaksiNasabahComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
