import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';

class Title {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {

  form: FormGroup;
  titles: Title[] = [
    {value: 'mrs', viewValue: 'Mrs'},
    {value: 'ms', viewValue: 'Ms'},
    {value: 'mr', viewValue: 'Mr'},
    {value: 'miss', viewValue: 'Miss'},
    {value: 'mx', viewValue: 'Mx'},
    {value: 'master', viewValue: 'Master'},
    {value: 'brigadier', viewValue: 'Brigadier'},
    {value: 'commander', viewValue: 'Commander'},
    {value: 'councillor', viewValue: 'Councillor'},
    {value: 'colonel', viewValue: 'Colonel'},
    {value: 'corporal', viewValue: 'Corporal'},
    {value: 'dame', viewValue: 'Dame'},
    {value: 'dr', viewValue: 'Dr'},
    {value: 'earl', viewValue: 'Earl'},
    {value: 'general', viewValue: 'General'},
    {value: 'lady', viewValue: 'Lady'},
    {value: 'lord', viewValue: 'Lord'},
    {value: 'major', viewValue: 'Major'},
    {value: 'private', viewValue: 'Private'},
    {value: 'professor', viewValue: 'Professor'},
    {value: 'reverend', viewValue: 'Reverend'},
    {value: 'sir', viewValue: 'Sir'},
  ];

  constructor(private formBuilder: FormBuilder, private router: Router) { }


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      age: [null, [Validators.required, this.ageValidator]],
      gender: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      phoneNumber: ['', [Validators.required,
      Validators.pattern('(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})')]],
      titleControl: ['', Validators.required]
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

    if (control.value != null && (control.value < 1 || control.value > 100)) {
      return { invalidAge: true };
    }
    return null;
  }

  navigateToProducts() {
    this.router.navigate(['products']);
  }
}
