import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteStudentModelComponent } from './delete-student-model.component';

describe('DeleteStudentModelComponent', () => {
  let component: DeleteStudentModelComponent;
  let fixture: ComponentFixture<DeleteStudentModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteStudentModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteStudentModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
