import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Server } from 'src/app/models/server';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit, OnDestroy {
  subscribe : Subject<boolean> = new Subject();

  servers: Server[] = [];

  constructor(private _serverService: ServerService ) { }

  ngOnInit(): void {
    this.listServers();
  }

  deleteServer(id: number) {
    if (confirm('êtes vous sure de vouloir supprimer ?\n cette action est irreversible')) {
      this._serverService.deleteServer(id).pipe(takeUntil(this.subscribe)).subscribe(
        data => {
          console.log('deleted response', data);
          this.listServers();
        }
      )
    }
  }

  listServers() {
    this._serverService.getServers().pipe(takeUntil(this.subscribe)).subscribe(
      data => this.servers = data
    )
  }

  listener(){
    this.listServers();
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
