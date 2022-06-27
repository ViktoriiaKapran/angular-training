import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[];
  dataSource;
  displayedColumns: string[] = ['id', 'email', 'firstName', 'lastName', 'phone', 'role', 'action'];
  usersCount: number;
  pageSize: number = 5;
  pageSizeOptions: number[] = [5, 10, 20];
  currentPage: number = 1;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<User>;

  constructor(private userService: UserService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((response) => {
      if (response.success) {
        this.users = response.users;
        this.dataSource = new MatTableDataSource(this.users);
        this.usersCount = this.users.length;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onPageChange(event) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.userService.getUsers().subscribe((response) => {
      if (response.success) {
        this.users = response.users;
        this.dataSource = this.users;

      }
    })
  }

  goToEdit() {

  }

  openDeletePopup(userId: string) {
    let dialogRef = this.dialog.open(DeleteConfirmationComponent, { autoFocus: false });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.deleteUser(userId).subscribe((response) => {
          if (response.success) {
            this.dataSource.data = this.dataSource.data.filter(user => user.id != userId );
          }
        });
      }
    });
  }
}
