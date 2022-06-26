import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

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

  constructor(private userServise: UserService) { }

  ngOnInit(): void {
    this.userServise.getUsers().subscribe((response) => {
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
    this.userServise.getUsers().subscribe((response) => {
      if (response.success) {
        this.users = response.users;
        this.dataSource = this.users;

      }
    })
  }

  goToEdit() {

  }

}
