import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Permission } from 'src/app/models/permission';
import { Role } from 'src/app/models/role';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-role-modal',
  templateUrl: './role-modal.component.html',
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
export class RoleModalComponent implements OnInit {

  closeResult!: string;
  @Input() title!: string;
  @Input() roleId!: string;
  @Output() update = new EventEmitter();
  icon=false;
  role: Role =new Role();
  permissions: Permission[] = [];
  dropdownList: any = [];
  selectedItems: Permission[] = [];
  dropdownSettings: IDropdownSettings = {};
  
  constructor(  private modalService: NgbModal, private _roleService: RoleService, 
                private _router: Router) {}
  ngOnInit(): void {
    if(this.title=="Ajouter") this.icon=true;
    this._roleService.getPermissions().subscribe(
      data => {
        data.forEach(permission=>{
          this.dropdownList.push({ id: permission.id, name: permission.name})
        });
      }      
    );
    this.selectedItems = [];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
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
  
  roleForm=new FormGroup({
    id: new FormControl(0,Validators.required),
    name: new FormControl('',Validators.required),
    permissions: new FormControl(),
  })

  saveRole() {
    this._roleService.saveRole(this.role).subscribe(
      data => {
        console.log('response', data);
        this._router.navigateByUrl("/Roles");
      }
    )
  }

  onSubmit() {
    
    this.role.name=this.roleForm.value.name!;
    this.role.id=this.roleForm.value.id!;
    this.role.permissions=this.roleForm.value.permissions!;
    
    console.log(this.role);

    if (this.role.id!=0) {
      this._roleService.updateRole(this.role).subscribe(
        data => {
          console.log('response', data);
          this.update.emit();
        }
      )
    }else{
      this._roleService.saveRole(this.role).subscribe(
        data => {
          console.log('response', data);
          this.update.emit();
        }
      )
    }
  }

  deleteRole(id: number) {
    this._roleService.deleteRole(id).subscribe(
      data => {
        console.log('deleted response', data);
        this._router.navigateByUrl('/Roles');
      }
    )
  }

  openVerticallyCentered(content: any) {
    if (this.roleId!="") {
      this._roleService.getRole(+this.roleId).subscribe(
        data => {
          console.log(data);
          
          this.role.id = data.id;
          this.role.name = data.name.split("_")[1].toLowerCase();
          this.role.permissions = data.permissions;
          this.roleForm.setValue({
            id:this.role.id,
            name:this.role.name,
            permissions:this.role.permissions,
          }); 
        }
      )
    }
    this.modalService.open(content, { centered: true });
  }

}
