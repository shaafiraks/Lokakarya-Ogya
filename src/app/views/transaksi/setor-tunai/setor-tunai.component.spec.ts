import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetorTunaiComponent } from './setor-tunai.component';

describe('SetorTunaiComponent', () => {
  let component: SetorTunaiComponent;
  let fixture: ComponentFixture<SetorTunaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetorTunaiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetorTunaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
