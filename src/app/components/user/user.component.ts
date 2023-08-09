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

  filters = {
    keyword: '',
    sortBy: 'id',
    order: 'desc'
  }
  
  sort(sortBy: string){
    if (this.filters.sortBy==sortBy) {
      this.filters.order=='desc'? this.filters.order='asc':this.filters.order='desc';
    }else{
      this.filters.sortBy=sortBy;
      this.filters.order='desc'
    }
  }

  isCurrentUser(matricule : string){
    return this.authService.user.sub==matricule;
  }
  ngOnDestroy() {
    this.subscribe.next(true);
  }

}
