import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ContextService } from 'src/app/services/context.service';
import { UserService } from 'src/app/services/user.service';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';

class SelectableItem {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  roles: SelectableItem[] = [
    { value: 'Artist', viewValue: 'Artist' },
    { value: 'Admin', viewValue: 'Admin' },
  ]
  id: string;
  form: FormGroup;
  changePasswordForm: FormGroup;
  hide = true;
  selectedTab: string = 'general';
  isCurrentUser: boolean;

  constructor(private formBuilder: FormBuilder, private userService: UserService,
    private activateRoute: ActivatedRoute, private contextService: ContextService,
    private _snackBar: MatSnackBar, public dialog: MatDialog, private router: Router) {
    this.id = activateRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    let user: User;
    this.userService.getUser(this.id).subscribe((response) => {
      if (response.success) {
        user = response.user;
      }
      this.form = this.formBuilder.group({
        id: [user?.id],
        firstName: [user?.firstName, [Validators.required]],
        lastName: [user?.lastName, [Validators.required]],
        email: [user?.email, [Validators.email, Validators.required]],
        phone: [user?.phone, [Validators.required,
        Validators.pattern('(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})')]],
      });
      if (this.contextService.getUser().role == 'Admin') {
        this.form.addControl('role', new FormControl(user?.role, [Validators.required]));
      }
      this.isCurrentUser = this.form.get('id').value == this.contextService.getUser().id;
      if (this.isCurrentUser) {
        this.changePasswordForm = this.formBuilder.group({
          password: ["", [Validators.required, Validators.pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=^.{6,128}$)'))]],
          confirmPassword: ["", [Validators.required, this.matchPassword]]
        });
      }
    });
  }

  changePassword() {
    if (this.changePasswordForm.invalid) {
      Object.keys(this.form.controls).forEach((controlName) => {
        this.form.get(controlName).markAsTouched();
      });
      return;
    }
    let user = {
      id: this.form.get('id').value,
      password: this.changePasswordForm.get('password').value
    }
    this.userService.changeUserPassword(user).subscribe((response) => {
      if (response.success) {
        this.openSnackBar('Password changed');
      }
    })
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

  updateUser() {
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach((controlName) => {
        this.form.get(controlName).markAsTouched();
      });
      return;
    }
    this.userService.updateUser(this.form.value).subscribe((response) => {
      this.openSnackBar('Saved');
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message);
  }

  goToPaintingsByUserId() {
    this.router.navigate(['gallery'], {queryParams: {userId: this.id}});
  }

  openDeletePopup() {
    let dialogRef = this.dialog.open(DeleteConfirmationComponent, { autoFocus: false });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.deleteUser(this.form.get('id').value).subscribe((response) => {
          if (response.success) {
            if (this.form.get('id').value == this.contextService.getUser().id) {
              this.contextService.setUser(null);
              this.contextService.setAuthToken('');
              this.router.navigate(['gallery']);
            }
            if (this.contextService.getUser().role == 'Admin') {
              this.router.navigate(['users']);
            }
          }
        });
      }
    });
  }

}
