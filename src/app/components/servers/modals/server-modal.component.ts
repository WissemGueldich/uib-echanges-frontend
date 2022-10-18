import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Server } from 'src/app/models/server';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'server-modal',
  templateUrl: './server-modal.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .dark-modal .modal-content {
      background-color: #292b2c;
      color: white;
    }
    .dark-modal .close {
      color: white;
    }
    .light-blue-backdrop {
      background-color: #5cb3fd;
    }
  `]
})
export class ServerModal {
  closeResult!: string;
  @Input() title!:string;
  @Input() serverId!:string;

  server: Server =new Server();

  constructor(private modalService: NgbModal, private _serverService: ServerService , private _router: Router) {}

  getServer(id:number){
    this._serverService.getServer(id).subscribe(
      data => this.server = data 
    )
  }

  saveServer() {
    this._serverService.saveServer(this.server).subscribe(
      data => {
        console.log('response', data);
        this._router.navigateByUrl("/servers");
      }
    )
  }

  onSubmit() {
    console.log(this.server);
    if (this.server.id) {
      this._serverService.updateServer(this.server).subscribe(
        data => {
          console.log('response', data);
          this._router.navigateByUrl('/servers');
        }
      )
    }else{
      this._serverService.saveServer(this.server).subscribe(
        data => {
          console.log('response', data);
          this._router.navigateByUrl('/servers');
        }
      )
    }
    window.location.reload()
  }

  deleteServer(id: number) {
    this._serverService.deleteServer(id).subscribe(
      data => {
        console.log('deleted response', data);
        this._router.navigateByUrl('/servers');
      }
    )
  }

  openVerticallyCentered(content: any) {
    if (this.serverId!="") {
      this._serverService.getServer(+this.serverId).subscribe(
        data => {
          this.server.id=data.id;
          this.server.address=data.address;
          this.server.mainAddress=data.mainAddress;
          this.server.secondaryAddress=data.secondaryAddress;
          this.server.port=data.port;
          this.server.libelle=data.libelle;
        }
      )
      console.log(this.server)
    }
    this.modalService.open(content, { centered: true });
  }

}