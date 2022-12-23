import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelpHistoryComponent } from './telp-history.component';

describe('TelpHistoryComponent', () => {
  let component: TelpHistoryComponent;
  let fixture: ComponentFixture<TelpHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelpHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelpHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
