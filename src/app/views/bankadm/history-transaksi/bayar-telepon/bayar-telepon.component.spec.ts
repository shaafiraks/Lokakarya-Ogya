import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BayarTeleponComponent } from './bayar-telepon.component';

describe('BayarTeleponComponent', () => {
  let component: BayarTeleponComponent;
  let fixture: ComponentFixture<BayarTeleponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BayarTeleponComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BayarTeleponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
