import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Role } from 'src/app/models/role';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit, OnDestroy {
  subscribe : Subject<boolean> = new Subject();


  roles: Role[] = [];
  filters = {
    keyword: '',
    sortBy: 'Name'
  }

  constructor(private _roleService: RoleService ) { }

  ngOnInit(): void {
    this.listRoles();
  }

  deleteRole(id: number) {
    if (confirm('êtes vous sure de vouloir supprimer ?\n cette action est irreversible')) {
      this._roleService.deleteRole(id).pipe(takeUntil(this.subscribe)).subscribe(
        data => {
          console.log('deleted response', data);
          this.listRoles();
        }
      )
    }
  }

  listRoles() {
    this._roleService.getRoles().pipe(takeUntil(this.subscribe)).subscribe(
      data => this.roles = data
    )
  }

  listener(){
    this.listRoles();
  }

  filterRoles(configs: Role[]) {
    // return Roles.filter((e) => {
    //   return e.RoleDate.toLowerCase().includes(this.filters.keyword.toLowerCase());
    // }).sort((a, b) => {
    //   if (this.filters.sortBy === 'date') {
    //     return a.RoleDate.toLowerCase() > b.RoleDate.toLowerCase() ? -1: 1;
    //   }else if(this.filters.sortBy === 'id') {
    //     return a.id > b.id ? -1: 1;
    //   }
    // })
  }
  ngOnDestroy() {
    this.subscribe.next(true);
  }

}
