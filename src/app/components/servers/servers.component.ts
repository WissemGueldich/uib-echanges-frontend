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
  
  filters = {
    keyword: '',
    sortBy: 'Name'
  }

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

  filterServers(Servers: Server[]) {
    // return Servers.filter((e) => {
    //   return e.ServerDate.toLowerCase().includes(this.filters.keyword.toLowerCase());
    // }).sort((a, b) => {
    //   if (this.filters.sortBy === 'date') {
    //     return a.ServerDate.toLowerCase() > b.ServerDate.toLowerCase() ? -1: 1;
    //   }else if(this.filters.sortBy === 'id') {
    //     return a.id > b.id ? -1: 1;
    //   }
    // })
  }
  ngOnDestroy() {
    this.subscribe.next(true);
  }

}
