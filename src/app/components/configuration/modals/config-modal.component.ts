import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
export class ConfigModal implements OnInit {
  closeResult!: string;
  @Input() title!: string;
  @Input() configId!: string;

  config: Configuration =new Configuration();
  servers: Server[] = [];
  systemUsers: SystemUser[]=[];
  constructor(  private modalService: NgbModal, private _configurationService: ConfigurationService, 
                private _serverService: ServerService, private _router: Router, private _systemUserService: SystemUserService) {}
  ngOnInit(): void {
    this._serverService.getServers().subscribe(
      data => this.servers = data
    );
    this._systemUserService.getSystemUsers().subscribe(
      data => this.systemUsers = data
    );
    
  }
  configForm=new FormGroup({
    libelle: new FormControl(''),
    filter: new FormControl(''),
    sourceServer: new FormControl(),
    destinationServer: new FormControl(),
    overwrite: new FormControl(false),
    move: new FormControl(false),
    automatic: new FormControl(false),
    archive: new FormControl(false),
    id: new FormControl(0),
    sourcePath: new FormControl(''),
    sourceArchivingPath: new FormControl(''),
    destinationPath: new FormControl(''),
    destinationArchivingPath: new FormControl(''),
    sourceUser: new FormControl(),
    destinationUser: new FormControl(),
  })

  saveConfiguration() {
    this._configurationService.saveConfiguration(this.config).subscribe(
      data => {
        console.log('response', data);
        this._router.navigateByUrl("/configs");
      }
    )
  }

  onSubmit() {
    this.config.id=this.configForm.value.id!;
    this.config.libelle=this.configForm.value.libelle!;
    this.config.sourceServer=this.configForm.value.sourceServer!;
    this.config.sourceUser=this.configForm.value.sourceUser!;
    this.config.sourcePath=this.configForm.value.sourcePath!;
    this.config.sourceArchivingPath=this.configForm.value.sourceArchivingPath!;
    this.config.destinationServer=this.configForm.value.destinationServer!;
    this.config.destinationUser=this.configForm.value.destinationUser!;
    this.config.destinationPath=this.configForm.value.destinationPath!;
    this.config.destinationArchivingPath=this.configForm.value.destinationArchivingPath!;
    this.config.overwrite=this.configForm.value.overwrite!;
    this.config.move=this.configForm.value.move!;
    this.config.automatic=this.configForm.value.automatic!;
    this.config.archive=this.configForm.value.archive!;
    this.config.filter=this.configForm.value.filter!;

    if (this.config.id!=0) {
      console.log("updating");
      console.log(this.config);
      
      this._configurationService.updateConfiguration(this.config).subscribe(
        data => {
          console.log('response', data);
          this._router.navigateByUrl('/configs');
        }
      )
    }else{
      this._configurationService.saveConfiguration(this.config).subscribe(
        data => {
          console.log('response', data);
          this._router.navigateByUrl('/configs');
        }
      )
    }
    window.location.reload()
  }

  deleteConfiguration(id: number) {
    this._configurationService.deleteConfiguration(id).subscribe(
      data => {
        console.log('deleted response', data);
        this._router.navigateByUrl('/configs');
      }
    )
  }

  openVerticallyCentered(content: any) {
    if (this.configId!="") {
      this._configurationService.getConfiguration(+this.configId).subscribe(
        data => {
          this.config.id = data.id;
          this.config.filter = data.filter;
          this.config.overwrite = data.overwrite;
          this.config.libelle = data.libelle;
          this.config.move = data.move;
          this.config.automatic = data.automatic;
          this.config.archive = data.archive;
          this.config.sourcePath = data.sourcePath;
          this.config.sourceArchivingPath = data.sourceArchivingPath;
          this.config.destinationPath = data.destinationPath;
          this.config.destinationArchivingPath = data.destinationArchivingPath;
          this.config.destinationServer = data.destinationServer;
          this.config.sourceServer = data.sourceServer;
          this.config.sourceUser = data.sourceUser;
          this.config.destinationUser = data.destinationUser;
          this.configForm.setValue({
            libelle:this.config.libelle ,
            filter:this.config.filter ,
            sourceServer:this.config.sourceServer ,
            destinationServer:this.config.destinationServer ,
            overwrite:this.config.overwrite ,
            move:this.config.move ,
            automatic:this.config.automatic ,
            archive:this.config.archive  ,
            sourcePath:this.config.sourcePath ,
            sourceArchivingPath:this.config.sourceArchivingPath ,
            destinationPath:this.config.destinationPath ,
            destinationArchivingPath:this.config.destinationArchivingPath ,
            sourceUser:this.config.sourceUser ,
            destinationUser:this.config.destinationUser ,
            id:this.config.id,
          }); 
        }
      )
    }
    this.modalService.open(content, { centered: true });
  }

}