import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentsAddComponent } from './departments-add.component';

describe('DepartmentsAddComponent', () => {
  let component: DepartmentsAddComponent;
  let fixture: ComponentFixture<DepartmentsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentsAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
