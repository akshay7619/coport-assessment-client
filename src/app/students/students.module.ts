import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentListComponent } from './components/student-list/student-list.component';
import { MaterialModule } from '../comon-modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CreateUpdateStudentModelComponent } from './models/create-update-student-model/create-update-student-model.component';
import { DeleteStudentModelComponent } from './models/delete-student-model/delete-student-model.component';


@NgModule({
  declarations: [
    StudentListComponent,
    CreateUpdateStudentModelComponent,
    DeleteStudentModelComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  entryComponents: [CreateUpdateStudentModelComponent]
})
export class StudentsModule { }
