import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TokenStorageService } from '../../services/token-storage.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  formUser!:FormGroup;
  isShown=true;
  isShown1=false;
  constructor(private token: TokenStorageService,private userService:UserService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    console.log(this.token.getToken());
    this.formUser=new FormGroup({
      id:new FormControl(this.currentUser.id,Validators.required),
      username:new FormControl(this.currentUser.username,Validators.required),
      email:new FormControl(this.currentUser.email,Validators.email),
      firstName:new FormControl(this.currentUser.firstName,Validators.required),
      lastName:new FormControl(this.currentUser.lastName,Validators.required),
      addresse:new FormControl(this.currentUser.addresse,Validators.required),
      phone:new FormControl(this.currentUser.phone,Validators.required),
      password : new FormControl(this.currentUser.password),
      created : new FormControl(this.currentUser.created,Validators.required),
      updated : new FormControl(this.currentUser.updated,Validators.required),

    })
    
  }
  updateuser(){
    const user = this.formUser.value;
    this.userService.updateUser(this.formUser.value).subscribe();
    user.roles=this.token.getUser().roles;
    this.token.saveUser(user);
    this.isShown1 = true;
    window.location.reload();
  }
  toggleShow() {
    this.isShown = !this.isShown;
  }
}