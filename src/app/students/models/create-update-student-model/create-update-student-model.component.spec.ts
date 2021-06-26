import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateStudentModelComponent } from './create-update-student-model.component';

describe('CreateUpdateStudentModelComponent', () => {
  let component: CreateUpdateStudentModelComponent;
  let fixture: ComponentFixture<CreateUpdateStudentModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateStudentModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateStudentModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
