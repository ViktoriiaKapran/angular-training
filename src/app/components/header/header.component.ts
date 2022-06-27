import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ContextService } from 'src/app/services/context.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog, public contextService: ContextService,
    private router: Router,) { }

  ngOnInit(): void {
  }

  openLoginPopup() {
    this.dialog.open(LoginComponent, { autoFocus: false});
  }

  getUserFullName() {
    return this.contextService.getUser().firstName + ' ' + this.contextService.getUser().lastName;
  }

  goToUsers() {
    this.router.navigate(['users']);
  }

  logOut() {
    this.contextService.setUser(null);
    this.contextService.setAuthToken('');
  }

}

