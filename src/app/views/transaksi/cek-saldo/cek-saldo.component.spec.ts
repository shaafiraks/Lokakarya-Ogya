import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CekSaldoComponent } from './cek-saldo.component';

describe('CekSaldoComponent', () => {
  let component: CekSaldoComponent;
  let fixture: ComponentFixture<CekSaldoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CekSaldoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CekSaldoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
