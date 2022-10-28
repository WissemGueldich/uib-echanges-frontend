import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Server } from 'src/app/models/server';
import { SystemUser } from 'src/app/models/systemUser';
import { ServerService } from 'src/app/services/server.service';
import { SystemUserService } from 'src/app/services/system-user.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
 

//TODO: add labels and check update modal 2nd click



@Component({
  selector: 'system-user-modal',
  templateUrl: './system-user-modal.component.html',
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
export class SystemUserModalComponent implements OnInit {
  closeResult!: string;
  @Input() title!: string;
  @Input() systemUserId!: string;
  systemUser: SystemUser =new SystemUser();
  servers: Server[] = [];
  dropdownList: any = [];
  selectedItems: Server[] = [];
  dropdownSettings: IDropdownSettings = {};
  constructor(  private modalService: NgbModal, private _systemUserService: SystemUserService, 
                private _serverService: ServerService, private _router: Router) {}
  ngOnInit(): void {
    this._serverService.getServers().subscribe(
      data => {
        this.servers=data;
        data.forEach(server=>{
          this.dropdownList.push({ id: server.id, libelle: server.libelle})
        });
      }      
    );
    this.selectedItems = [];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'libelle',
      selectAllText: 'Selectionner tout',
      unSelectAllText: 'Désélectionner tout',
      itemsShowLimit: 10,
      allowSearchFilter: true
    };
  }
  onItemSelect(item: any) {
  }
  onSelectAll(items: any) {
  }
  
  systemUserForm=new FormGroup({
    id: new FormControl(0,Validators.required),
    libelle: new FormControl('',Validators.required),
    login: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
    enabled: new FormControl(false,Validators.required),
    servers: new FormControl()
  })

  saveSystemUser() {
    this._systemUserService.saveSystemUser(this.systemUser).subscribe(
      data => {
        console.log('response', data);
        this._router.navigateByUrl("/systemUsers");
      }
    )
  }

  onSubmit() {
    this.systemUser.enabled=this.systemUserForm.value.enabled!;
    this.systemUser.login=this.systemUserForm.value.login!;
    this.systemUser.password=this.systemUserForm.value.password!;
    this.systemUser.libelle=this.systemUserForm.value.libelle!;
    this.systemUser.id=this.systemUserForm.value.id!;
    this.systemUser.servers=this.systemUserForm.value.servers!;

    if (this.systemUser.id!=0) {
      this._systemUserService.updateSystemUser(this.systemUser).subscribe(
        data => {
          console.log('response', data);
          this._router.navigateByUrl('/systemUsers');
        }
      )
    }else{
      this._systemUserService.saveSystemUser(this.systemUser).subscribe(
        data => {
          console.log('response', data);
          this._router.navigateByUrl('/systemUsers');
        }
      )
    }
    window.location.reload()
  }

  deleteSystemUser(id: number) {
    this._systemUserService.deleteSystemUser(id).subscribe(
      data => {
        console.log('deleted response', data);
        this._router.navigateByUrl('/systemUsers');
      }
    )
  }

  openVerticallyCentered(content: any) {
    if (this.systemUserId!="") {
      this._systemUserService.getSystemUser(+this.systemUserId).subscribe(
        data => {
          this.systemUser.id = data.id;
          this.systemUser.libelle = data.libelle;
          this.systemUser.login = data.login;
          this.systemUser.password = data.password;
          this.systemUser.enabled = data.enabled;
          this.systemUser.servers = data.servers;
          this.systemUserForm.setValue({
            enabled:this.systemUser.enabled,
            id:this.systemUser.id,
            libelle:this.systemUser.libelle,
            login:this.systemUser.login,
            password:this.systemUser.password,
            servers:this.systemUser.servers,
          }); 
        }
      )
    }
    this.modalService.open(content, { centered: true });
  }
}
