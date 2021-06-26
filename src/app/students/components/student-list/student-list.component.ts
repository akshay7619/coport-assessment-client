import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { CreateUpdateStudentModelComponent } from '../../models/create-update-student-model/create-update-student-model.component';
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
  displayedColumns: string[] = ['_id', 'name', 'fatherName', 'motherName'];
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
      if (newStudentDetails && newStudentDetails.data && !newStudentDetails.data.id) {
        this.restService.postRequest(this.apiRoute, null, newStudentDetails.data).subscribe((res: any) => {
          this.toaterService.success("Student added successfully!", "SUCCESS")
          this.getAllStudents();
        }, err => {
          console.log(err)
          this.toaterService.error(err.error.message, "Error")
        });
      } else if (newStudentDetails && newStudentDetails.data && newStudentDetails.data.id) {
        this.restService.patchRequest(this.apiRoute, newStudentDetails.data.id, newStudentDetails.data).subscribe((res: any) => {
          this.toaterService.success(res.message, "SUCCESS")
          this.getAllStudents();
        }, err => {
          console.log(err)
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