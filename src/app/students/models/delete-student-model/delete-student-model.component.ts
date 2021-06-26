import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-student-model',
  templateUrl: './delete-student-model.component.html',
  styleUrls: ['./delete-student-model.component.scss']
})
export class DeleteStudentModelComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<DeleteStudentModelComponent>) { }


  ngOnInit(): void {
  }

  delete() {
    this.dialogRef.close({ event: 'delete' });
  }

}
