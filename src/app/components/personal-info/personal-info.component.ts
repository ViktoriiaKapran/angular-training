import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {

  form: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    //     first name - text input - required
    // last name - text input - required
    // age - number input - required, >1990 and not future
    // gender - select - required
    // email - text input - email validation
    // phone number - text input - required, general phone validation
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      age: [null, [Validators.required, this.ageValidator]],
      gender: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      phoneNumber: ['', [Validators.required,
      Validators.pattern('(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})')]]
    });
    this.form.get('lastName').valueChanges.subscribe((value: string) => {
      if (value?.toLowerCase() == 'путин') {
        setTimeout(() => {
          alert('Іди нахуй!!!')
        }, 0);
      }
    });
  }

  submit() {
    Object.keys(this.form.controls).forEach((controlName) => {
      this.form.get(controlName).markAsTouched();
    });
    console.log(this.form.value);
  }
  ageValidator(control: FormControl): ValidationErrors {
         
    if(control.value != null && (control.value < 1 || control.value > 100)){
        return {age: true};
    }
    return null;
}
}
