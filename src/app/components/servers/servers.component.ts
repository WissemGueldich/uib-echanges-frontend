import { Component, OnInit } from '@angular/core';
import { Server } from 'src/app/models/server';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
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
    this._serverService.deleteServer(id).subscribe(
      data => {
        console.log('deleted response', data);
        this.listServers();
      }
    )
  }

  listServers() {
    this._serverService.getServers().subscribe(
      data => this.servers = data
    )
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

}
