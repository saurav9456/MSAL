import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  dataSource = [
  { id: 1, name: 'Alice', age: 30, isEditing: false },
  { id: 2, name: 'Bob', age: 25, isEditing: false },
];
formGroup: FormGroup;

constructor(private fb: FormBuilder) {
  this.formGroup = this.fb.group({
    name: new FormControl(''),
    age: new FormControl(0),
  });
}

onEditClick(row: any) {
  this.dataSource.forEach(r => r.isEditing = false); // Cancel other edits
  this.formGroup.reset(); 
  row.isEditing = true;
  this.formGroup.patchValue({
    name: row.name,
    age: row.age
  });
}

onSubmit(row: any) {
  const newValue = this.formGroup.value;
  row.name = newValue.name;
  row.age = newValue.age;
  row.isEditing = false;
}

onCancel(row: any) {
  row.isEditing = false;
}
get nameControl(): FormControl {
  return this.formGroup.get('name') as FormControl;
}

get ageControl(): FormControl {
  return this.formGroup.get('age') as FormControl;
}
}
