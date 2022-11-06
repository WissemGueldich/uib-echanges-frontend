import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users: User[] = [];
  filters = {
    keyword: '',
    sortBy: 'Name'
  }

  constructor(private _userService: UserService ) { }

  ngOnInit(): void {
    this.listUsers();
  }

  deleteUser(id: number) {
    this._userService.deleteUser(id).subscribe(
      data => {
        console.log('deleted response', data);
        this.listUsers();
      }
    )
  }

  listUsers() {
    this._userService.getUsers().subscribe(
      data => this.users = data
    )
  }

  filterUsers(users: User[]) {
    // return users.filter((e) => {
    //   return e.UserDate.toLowerCase().includes(this.filters.keyword.toLowerCase());
    // }).sort((a, b) => {
    //   if (this.filters.sortBy === 'date') {
    //     return a.UserDate.toLowerCase() > b.UserDate.toLowerCase() ? -1: 1;
    //   }else if(this.filters.sortBy === 'id') {
    //     return a.id > b.id ? -1: 1;
    //   }
    // })
  }

}
