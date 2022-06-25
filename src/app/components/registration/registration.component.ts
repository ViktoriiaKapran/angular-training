import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;
  hide = true;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      email: ["", [Validators.email, Validators.required]],
      phoneNumber: ["", [Validators.required,
      Validators.pattern('(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})')]],
      password: ["", [Validators.required, Validators.pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=^.{6,128}$)'))]],
      confirmPassword: ["", [Validators.required, this.matchPassword]]
    });
  }

  createUser() {
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach((controlName) => {
        this.form.get(controlName).markAsTouched();
      });
      return;
    }
    let user = {
      firstName: this.form.get('firstName').value,
      lastName: this.form.get('lastName').value,
      email: this.form.get('email').value,
      password: this.form.get('password').value,
      role: 'Artist',
      phone: this.form.get('phoneNumber').value,
    }
    this.userService.createUser(user).subscribe((response) => {
      if (response.success) {
        this.router.navigate(['gallery']);
      }
    });
  }


  matchPassword(control: FormControl): ValidationErrors {
    if (control.value) {
      const passwordValue = control.parent.get('password')?.value;
      if (control.value !== passwordValue) {
        return { passwordMismatch: true };
      }
    }
    return null;
  }

}
