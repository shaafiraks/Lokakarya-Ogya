import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterBankComponent } from './master-bank.component';

describe('MasterBankComponent', () => {
  let component: MasterBankComponent;
  let fixture: ComponentFixture<MasterBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterBankComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
