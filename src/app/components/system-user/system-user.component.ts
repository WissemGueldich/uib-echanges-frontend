import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { SystemUser } from 'src/app/models/systemUser';
import { SystemUserService } from 'src/app/services/system-user.service';

@Component({
  selector: 'app-system-user',
  templateUrl: './system-user.component.html',
  styleUrls: ['./system-user.component.scss']
})
export class SystemUserComponent implements OnInit, OnDestroy {
  subscribe : Subject<boolean> = new Subject();


  systemUsers: SystemUser[] = [];

  constructor(private _systemUserService: SystemUserService ) { }

  ngOnInit(): void {
    this.listSystemUsers();
  }

  deleteSystemUser(id: number) {
    if (confirm('êtes vous sure de vouloir supprimer ?\n cette action est irreversible')) {
      this._systemUserService.deleteSystemUser(id).pipe(takeUntil(this.subscribe)).subscribe(
        data => {
          console.log('deleted response', data);
          this.listSystemUsers();
        }
      )
    }
  }

  listSystemUsers() {
    this._systemUserService.getSystemUsers().pipe(takeUntil(this.subscribe)).subscribe(
      data => this.systemUsers = data
    )
  }

  listener(){
    this.listSystemUsers();
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

  ngOnDestroy() {
    this.subscribe.next(true);
  }
}
