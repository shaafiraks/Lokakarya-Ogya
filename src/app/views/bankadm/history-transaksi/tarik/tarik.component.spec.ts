import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarikComponent } from './tarik.component';

describe('TarikComponent', () => {
  let component: TarikComponent;
  let fixture: ComponentFixture<TarikComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarikComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
