import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-create-update-student-model',
  templateUrl: './create-update-student-model.component.html',
  styleUrls: ['./create-update-student-model.component.scss']
})
export class CreateUpdateStudentModelComponent implements OnInit {
  form: FormGroup;
  mode: 'create' | 'update' = 'create';
  constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<CreateUpdateStudentModelComponent>,
    private fb: FormBuilder) { }

  ngOnInit() {
    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {};
    }
    this.form = this.fb.group({
      _id: new FormControl({ value: this.defaults && this.defaults._id ? this.defaults._id : '', disabled: true }),
      name: new FormControl({ value: this.defaults && this.defaults.name ? this.defaults.name : '', disabled: false }, [Validators.required]),
      fatherName: new FormControl({ value: this.defaults && this.defaults.fatherName ? this.defaults.fatherName : '', disabled: false }),
      motherName: new FormControl({ value: this.defaults && this.defaults.motherName ? this.defaults.motherName : '', disabled: false }),
    });
  }
  save() {
    this.dialogRef.close({ event: 'save', data: this.form.getRawValue() });
  }
}
