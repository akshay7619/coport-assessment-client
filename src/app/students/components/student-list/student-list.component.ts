import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { CreateUpdateStudentModelComponent } from '../../models/create-update-student-model/create-update-student-model.component';
import { DeleteStudentModelComponent } from '../../models/delete-student-model/delete-student-model.component';
import { RestHandlerServiceService } from '../../services/rest-handler-service.service';
export interface StudentData {
  _id: string;
  name: string;
  fatherName: string;
  MotherName: string;
}

/**
 * @title Data table with sorting, pagination, and filtering.
 */

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements AfterViewInit {
  displayedColumns: string[] = ['_id', 'name', 'fatherName', 'motherName', 'editStudent', 'deleteStudent'];
  dataSource: MatTableDataSource<StudentData>;
  apiRoute = `students`;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private restService: RestHandlerServiceService,
    private toaterService: ToastrService,
    private dialog: MatDialog
  ) {
    this.getAllStudents();
  }

  /**
  * Get all students
  */
  getAllStudents() {
    this.restService.getRequest(this.apiRoute).subscribe(studentList => {
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(studentList);
      setTimeout(() => {
        this.restService.changeDetect.next(this.dataSource);
      }, 500)
    }, err => {
      console.error(err.message);
      this.toaterService.error(err.message, "ERROR")
    })
  }

  /**
  * Add or Update Student
  */
  add(data: any) {
    this.dialog.open(CreateUpdateStudentModelComponent, {
      height: 'auto',
      width: '30rem',
      disableClose: true,
      data: data ? data : null
    }).afterClosed().subscribe((newStudentDetails) => {
      if (newStudentDetails && newStudentDetails.data && !newStudentDetails.data._id) {
        this.restService.postRequest(this.apiRoute, null, newStudentDetails.data).subscribe((res: any) => {
          this.toaterService.success("Student added successfully!", "SUCCESS")
          this.getAllStudents();
        }, err => {
          this.toaterService.error(err.error.message, "Error")
        });
      } else if (newStudentDetails && newStudentDetails.data && newStudentDetails.data._id) {
        this.restService.patchRequest(this.apiRoute, newStudentDetails.data._id, newStudentDetails.data).subscribe((res: any) => {
          this.toaterService.success("Student updated successfully!", "SUCCESS")
          this.getAllStudents();
        }, err => {
          this.toaterService.error(err.error.message, "Error")
        });
      }
    });
  }

  /**
   * Delete a student
   */

  delete(data) {
    this.dialog.open(DeleteStudentModelComponent, {
      height: 'auto',
      width: '30rem',
      disableClose: true,
      data: data ? data : null
    }).afterClosed().subscribe(({ event }) => {
      if (event == 'delete') {
        this.restService.deleteRequest(this.apiRoute, data._id).subscribe((res: any) => {
          this.toaterService.success("Student deleted successfully!", "SUCCESS")
          this.getAllStudents();
        }, err => {
          this.toaterService.error(err.error.message, "Error")
        });
      }
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}