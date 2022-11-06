import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { ProfileService } from 'src/app/services/profile.service';
import { Profile } from 'src/app/models/profile';
import { Role } from 'src/app/models/role';
import { RoleService } from 'src/app/services/role.service';
@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
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
export class UserModalComponent implements OnInit {

  closeResult!: string;
  @Input() title!: string;
  @Input() userId!: string;
  icon=false;
  user: User =new User();
  roles: Role[] = [];
  profiles: Profile[] = [];
  dropdownList: any = [];
  dropdownList2: any = [];
  selectedItems: Role[] = [];
  selectedItems2: Profile[] = [];
  dropdownSettings: IDropdownSettings = {};
  dropdownSettings2: IDropdownSettings = {};

  constructor(  private modalService: NgbModal, private _userService: UserService, 
                private _roleService: RoleService, private _router: Router,
                private _profileService: ProfileService,) {}
  ngOnInit(): void {
    if(this.title=="Ajouter") this.icon=true;
    this._roleService.getRoles().subscribe(
      data => {
        this.roles=data;
        data.forEach(role=>{
          this.dropdownList.push({ id: role.id, name: role.name})
        });
      }      
    );
    this._profileService.getProfiles().subscribe(
      data => {
        this.profiles=data;
        data.forEach(profile=>{
          this.dropdownList2.push({ id: profile.id, name: profile.libelle})
        });
      }      
    );
    this.selectedItems = [];
    this.selectedItems2 = [];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Selectionner tout',
      unSelectAllText: 'Désélectionner tout',
      itemsShowLimit: 10,
      allowSearchFilter: true
    };
    this.dropdownSettings2 = {
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
  
  userForm=new FormGroup({
    id: new FormControl(0,Validators.required),
    matricule: new FormControl('',Validators.required),
    lastName: new FormControl('',Validators.required),
    firstName: new FormControl('',Validators.required),
    email: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
    enabled: new FormControl(false,Validators.required),
    roles: new FormControl(),
    profiles: new FormControl()
  })

  saveUser() {
    this._userService.saveUser(this.user).subscribe(
      data => {
        console.log('response', data);
        this._router.navigateByUrl("/users");
      }
    )
  }

  onSubmit() {    
    this.user.enabled=this.userForm.value.enabled!;
    this.user.firstName=this.userForm.value.firstName!;
    this.user.email=this.userForm.value.email!;
    this.user.lastName=this.userForm.value.lastName!;
    this.user.id=this.userForm.value.id!;
    this.user.roles=this.userForm.value.roles!;
    this.user.password=this.userForm.value.password!;
    this.user.matricule=this.userForm.value.matricule!;

    if (this.user.id!=0) {
      this._userService.updateUser(this.user).subscribe(
        data => {
          console.log('response', data);
          this._router.navigateByUrl('/users');
        }
      )
    }else{
      this._userService.saveUser(this.user).subscribe(
        data => {
          console.log('response', data);
          this._router.navigateByUrl('/users');
        }
      )
    }
    window.location.reload()
  }

  deleteUser(id: number) {
    this._userService.deleteUser(id).subscribe(
      data => {
        console.log('deleted response', data);
        this._router.navigateByUrl('/users');
      }
    )
  }

  openVerticallyCentered(content: any) {
    if (this.userId!="") {
      this._userService.getUser(+this.userId).subscribe(
        data => {
          console.log(data);
          
          this.user.id = data.id;
          this.user.matricule = data.matricule;
          this.user.lastName = data.lastName;
          this.user.firstName = data.firstName;
          this.user.email = data.email;
          this.user.password = data.password;
          this.user.roles = data.roles;
          this.user.profiles = data.profiles;
          this.user.enabled = data.enabled;

          this.userForm.setValue({
            id:this.user.id,
            matricule:this.user.matricule,
            lastName:this.user.lastName,
            firstName:this.user.firstName,
            email:this.user.email,
            password:this.user.password,
            roles:this.user.roles,
            profiles:this.user.profiles,
            enabled:this.user.enabled,
          }); 
        }
      )
    }
    this.modalService.open(content, { centered: true });
  }

}
