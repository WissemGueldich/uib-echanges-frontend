import { Component, OnInit } from '@angular/core';
import { SystemUser } from 'src/app/models/systemUser';
import { SystemUserService } from 'src/app/services/system-user.service';

@Component({
  selector: 'app-system-user',
  templateUrl: './system-user.component.html',
  styleUrls: ['./system-user.component.scss']
})
export class SystemUserComponent implements OnInit {

  systemUsers: SystemUser[] = [];
  filters = {
    keyword: '',
    sortBy: 'Name'
  }

  constructor(private _systemUserService: SystemUserService ) { }

  ngOnInit(): void {
    this.listSystemUsers();
  }

  deleteSystemUser(id: number) {
    this._systemUserService.deleteSystemUser(id).subscribe(
      data => {
        console.log('deleted response', data);
        this.listSystemUsers();
      }
    )
  }

  listSystemUsers() {
    this._systemUserService.getSystemUsers().subscribe(
      data => this.systemUsers = data
    )
  }

  filterSystemUsers(systemUsers: SystemUser[]) {
    // return SystemUsers.filter((e) => {
    //   return e.SystemUserDate.toLowerCase().includes(this.filters.keyword.toLowerCase());
    // }).sort((a, b) => {
    //   if (this.filters.sortBy === 'date') {
    //     return a.SystemUserDate.toLowerCase() > b.SystemUserDate.toLowerCase() ? -1: 1;
    //   }else if(this.filters.sortBy === 'id') {
    //     return a.id > b.id ? -1: 1;
    //   }
    // })
  }
}
