import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Server } from 'src/app/models/server';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'server-modal',
  templateUrl: './server-modal.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
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
    `,
  ],
})
export class ServerModal implements OnInit {
  closeResult!: string;
  @Input() title!: string;
  @Input() serverId!: string;
  @Output() update = new EventEmitter();
  icon = false;
  server: Server = new Server();

  constructor(
    private modalService: NgbModal,
    private _serverService: ServerService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    if (this.title == 'Ajouter') this.icon = true;
  }

  serverForm = new FormGroup({
    id: new FormControl(0,{nonNullable: true}),
    libelle: new FormControl(this.server.libelle, [
      Validators.required,
      Validators.maxLength(40),
    ]),
    address: new FormControl(this.server.address, [
      Validators.required,
      Validators.pattern(
        '^((25[0-5]|(2[0-4]|1[0-9]|[1-9]|)[0-9])(\.(?!$)|$)){4}$'
      ),
    ]),
    port: new FormControl(22, [
      Validators.required,
      Validators.pattern('^((6553[0-5])|(655[0-2][0-9])|(65[0-4][0-9]{2})|(6[0-4][0-9]{3})|([1-5][0-9]{4})|([0-5]{0,5})|([0-9]{1,4}))$'),
    ]),
    mainAddress: new FormControl(this.server.mainAddress),
    secondaryAddress: new FormControl(this.server.secondaryAddress),
  });

  saveServer() {
    this._serverService.saveServer(this.server).subscribe((data) => {
      this._router.navigateByUrl('/servers');
    });
  }

  onSubmit() {
    if (this.serverForm.valid) {
      this.server.id = this.serverForm.value.id!;
      this.server.libelle = this.serverForm.value.libelle!;
      this.server.address = this.serverForm.value.address!;
      this.server.port = +this.serverForm.value.port!;
      this.server.mainAddress = this.serverForm.value.address!;
      this.server.secondaryAddress = this.serverForm.value.address!;

      if (this.server.id != 0) {
        this._serverService.updateServer(this.server).subscribe((data) => {
          this.update.emit();
        });
      } else {
        this._serverService.saveServer(this.server).subscribe((data) => {
          this.update.emit();
        });
      }
      this.serverForm.reset();
    }
  }

  deleteServer(id: number) {
    this._serverService.deleteServer(id).subscribe((data) => {
      this._router.navigateByUrl('/servers');
    });
  }

  openVerticallyCentered(content: any) {
    if (this.serverId != '') {
      this._serverService.getServer(+this.serverId).subscribe((data) => {
        this.server.id = data.id;
        this.server.address = data.address;
        this.server.mainAddress = data.mainAddress;
        this.server.secondaryAddress = data.secondaryAddress;
        this.server.port = data.port;
        this.server.libelle = data.libelle;
        this.serverForm.setValue({
          id: this.server.id,
          libelle: this.server.libelle,
          address: this.server.address,
          port: this.server.port,
          mainAddress: this.server.mainAddress,
          secondaryAddress: this.server.secondaryAddress,
        });
      });
    }
    this.modalService.open(content, { centered: true });
  }
}
