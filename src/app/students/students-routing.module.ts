import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentListComponent } from './components/student-list/student-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'students-list', pathMatch: 'full' },
  { path: 'students-list', component: StudentListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
