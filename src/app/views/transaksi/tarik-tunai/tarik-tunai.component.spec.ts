import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarikTunaiComponent } from './tarik-tunai.component';

describe('TarikTunaiComponent', () => {
  let component: TarikTunaiComponent;
  let fixture: ComponentFixture<TarikTunaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarikTunaiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarikTunaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
