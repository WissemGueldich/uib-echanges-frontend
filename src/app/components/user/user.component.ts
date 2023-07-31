import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/security/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

  subscribe : Subject<boolean> = new Subject();

  users: User[] = [];
  filters = {
    keyword: '',
    sortBy: 'Name'
  }

  constructor(private authService: AuthService, private _userService: UserService ) { }

  ngOnInit(): void {
    this.listUsers();
  }

  deleteUser(id: number) {
    if (confirm('êtes vous sure de vouloir supprimer ?\n cette action est irreversible')) {
      this._userService.deleteUser(id).pipe(takeUntil(this.subscribe)).subscribe(
        () => {
          this.listUsers();
        }
      )
    }
  }

  listUsers() {
    this._userService.getUsers().pipe(takeUntil(this.subscribe)).subscribe(
      data => this.users = data
    )
  }

  listener(){
    this.listUsers();
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
  isCurrentUser(matricule : string){
    return this.authService.user.sub==matricule;
  }
  ngOnDestroy() {
    this.subscribe.next(true);
  }

}
