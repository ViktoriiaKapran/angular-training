import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { ContextService } from 'src/app/services/context.service';
import { UserService } from 'src/app/services/user.service';

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

  constructor(private formBuilder: FormBuilder,private userService: UserService,
    private activateRoute: ActivatedRoute, private contextService: ContextService,) {
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
    })

  }
  updateUser() {
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach((controlName) => {
        this.form.get(controlName).markAsTouched();
      });
      return;
    }
    this.userService.updateUser(this.form.value).subscribe((response) => {
      // todo snackbar
    });
  }


}
