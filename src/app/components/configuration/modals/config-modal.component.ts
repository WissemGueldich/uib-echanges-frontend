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
import { Configuration } from 'src/app/models/configuration';
import { Server } from 'src/app/models/server';
import { SystemUser } from 'src/app/models/systemUser';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { ServerService } from 'src/app/services/server.service';
import { SystemUserService } from 'src/app/services/system-user.service';

@Component({
  selector: 'config-modal',
  templateUrl: './config-modal.component.html',
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
export class ConfigModal implements OnInit {
  closeResult!: string;
  @Input() title!: string;
  @Input() configId!: string;
  @Output() update = new EventEmitter();
  icon = false;
  config: Configuration = new Configuration();
  servers: Server[] = [];
  sourceSystemUsers: SystemUser[] = [];
  destinationSystemUsers: SystemUser[] = [];

  constructor(
    private modalService: NgbModal,
    private _configurationService: ConfigurationService,
    private _serverService: ServerService,
    private _router: Router,
    private _systemUserService: SystemUserService
  ) {}

  ngOnInit(): void {
    if (this.title == 'Ajouter') this.icon = true;
    this._serverService.getServers().subscribe((data) => {
      this.servers = data;
    });
    this.updateForm();
  }

  configForm = new FormGroup({
    libelle: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(40),
    ]),
    filter: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(30),
    ]),
    sourceServer: new FormControl(this.config.sourceServer, [
      Validators.required,
    ]),
    destinationServer: new FormControl(this.config.destinationServer, [
      Validators.required,
    ]),
    overwrite: new FormControl(false),
    move: new FormControl(false),
    automatic: new FormControl(false),
    archive: new FormControl(false),
    id: new FormControl(0,{nonNullable: true}),
    sourcePath: new FormControl('', [
      Validators.required,
      Validators.minLength(1), Validators.maxLength(60)
    ]),
    sourceArchivingPath: new FormControl('', [
      Validators.required,
      Validators.minLength(1),Validators.maxLength(60)
    ]),
    destinationPath: new FormControl('', [
      Validators.required,
      Validators.minLength(1),Validators.maxLength(60)
    ]),
    destinationArchivingPath: new FormControl('', [
      Validators.required,
      Validators.minLength(1),Validators.maxLength(60)
    ]),
    sourceUser: new FormControl(this.config.sourceUser, [Validators.required]),
    destinationUser: new FormControl(this.config.destinationUser, [
      Validators.required,
    ]),
  });

  saveConfiguration() {
    this._configurationService
      .saveConfiguration(this.config)
      .subscribe(() => {
        this._router.navigateByUrl('/configs');
      });
  }

  updateForm() {
    if (this.configId != '') {
      this._configurationService
        .getConfiguration(+this.configId)
        .subscribe((data) => {
          this.config = data;
          this.configForm.setValue(this.config);
          if(this.servers!=null && this .servers.length>0){
            this.servers.forEach((server) => {
              if (this.config.sourceServer && server.id === this.config.sourceServer.id) {
                this.configForm.controls['sourceServer'].setValue(server);
              }
              if (this.config.destinationServer && server.id === this.config.destinationServer.id) {
                this.configForm.controls['destinationServer'].setValue(server);
              }
            });
          }
          
          this.onSelectSource();
          this.onSelectDestination();
        });
    } 
  }

  onSubmit() {
    if (this.configForm.valid) {
      this.config.id = this.configForm.value.id!;
      this.config.libelle = this.configForm.value.libelle!;
      this.config.sourceServer = this.configForm.value.sourceServer!;
      this.config.sourceUser = this.configForm.value.sourceUser!;
      this.config.sourcePath = this.configForm.value.sourcePath!;
      this.config.sourceArchivingPath =
        this.configForm.value.sourceArchivingPath!;
      this.config.destinationServer = this.configForm.value.destinationServer!;
      this.config.destinationUser = this.configForm.value.destinationUser!;
      this.config.destinationPath = this.configForm.value.destinationPath!;
      this.config.destinationArchivingPath =
        this.configForm.value.destinationArchivingPath!;
      this.config.overwrite = this.configForm.value.overwrite!;
      this.config.move = this.configForm.value.move!;
      this.config.automatic = this.configForm.value.automatic!;
      this.config.archive = this.configForm.value.archive!;
      this.config.filter = this.configForm.value.filter!;

      if (this.config.id != 0) {
        this._configurationService
          .updateConfiguration(this.config)
          .subscribe(() => {
            this.update.emit();
          });
      } else {
        this._configurationService
          .saveConfiguration(this.config)
          .subscribe(() => {
            this.update.emit();
          });
      }
      this.configForm.reset();
    }
  }

  onSelectSource() {
    if (this.configForm.controls['sourceServer'].value != undefined) {
      this._systemUserService
        .getSystemUsersByServer(
          this.configForm.controls['sourceServer'].value!.id
        )
        .subscribe((data) => {
          this.sourceSystemUsers = data;
          this.sourceSystemUsers.forEach((sUser) => {
            if (this.config.destinationUser && sUser.id === this.config.sourceUser.id) {
              this.configForm.controls['sourceUser'].setValue(sUser);
            }
          });
        });
    }
  }

  onSelectDestination() {
    if (this.configForm.controls['destinationServer'].value != undefined) {
      this._systemUserService
        .getSystemUsersByServer(
          this.configForm.controls['destinationServer'].value!.id
        )
        .subscribe((data) => {
          this.destinationSystemUsers = data;
          this.destinationSystemUsers.forEach((sUser) => {
            if (this.config.destinationUser && sUser.id === this.config.destinationUser.id) {
              this.configForm.controls['destinationUser'].setValue(sUser);
            }
          });
        });
    }
  }

  openVerticallyCentered(content: any) {
    this.updateForm();
    this.modalService.open(content, { centered: true });
  }
}