import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ContextService } from 'src/app/services/context.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  hide = true;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder, private userService: UserService,
    private router: Router, private contextService: ContextService, public dialogRef: MatDialogRef<LoginComponent>) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ["", [Validators.email, Validators.required]],
      password: ["", [Validators.required, Validators.pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=^.{6,128}$)'))]],
    })
  }

  login() {
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach((controlName) => {
        this.form.get(controlName).markAsTouched();
      });
      return;
    }
    this.userService.authUser(this.form.value).subscribe((response) => {
      this.contextService.setUser(response.user);
      this.contextService.setAuthToken(response.token);
      this.dialogRef.close();

    }, (error) => {
      this.errorMessage = error.error?.errorMessage;
    });
  }

  goToRegistration() {
    this.router.navigate(['registration']);
  }
}
