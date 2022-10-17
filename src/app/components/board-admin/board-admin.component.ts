import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { timeout } from 'rxjs/operators';
import { TokenStorageService } from '../../services/token-storage.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css'],
})
export class BoardAdminComponent implements OnInit {
  content?: any;
  readOnly = false;
  formUser!: FormGroup;
  selectedUser?: any;
  isShown = false;
  constructor(
    private token: TokenStorageService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      (data) => {
        this.content = data;
      },
      (err) => {
        this.content = JSON.parse(err.error).message;
      }
    );
    this.userService.getUser(this.token.getUser().id).subscribe(
      (userr) => {
        this.selectedUser = userr;
        this.formUser = new FormGroup({
          id: new FormControl(this.selectedUser.id, Validators.required),
          username: new FormControl(
            this.selectedUser.username,
            Validators.required
          ),
          email: new FormControl(this.selectedUser.email, Validators.email),
          firstName: new FormControl(
            this.selectedUser.firstName,
            Validators.required
          ),
          lastName: new FormControl(
            this.selectedUser.lastName,
            Validators.required
          ),
          addresse: new FormControl(
            this.selectedUser.addresse,
            Validators.required
          ),
          phone: new FormControl(this.selectedUser.phone, Validators.required),
          password: new FormControl(this.selectedUser.password),
          created: new FormControl(
            this.selectedUser.created,
            Validators.required
          ),
          updated: new FormControl(
            this.selectedUser.updated,
            Validators.required
          ),
        });
      },
      (err) => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }
  toggleShow() {
    this.isShown = !this.isShown;
  }
  updateUser(id: number) {
    this.userService.getUser(id).subscribe(
      (userr) => {
        this.selectedUser = userr;
        console.log(this.selectedUser);
        this.formUser = new FormGroup({
          id: new FormControl(this.selectedUser.id, Validators.required),
          username: new FormControl(
            this.selectedUser.username,
            Validators.required
          ),
          email: new FormControl(this.selectedUser.email, Validators.email),
          firstName: new FormControl(
            this.selectedUser.firstName,
            Validators.required
          ),
          lastName: new FormControl(
            this.selectedUser.lastName,
            Validators.required
          ),
          addresse: new FormControl(
            this.selectedUser.addresse,
            Validators.required
          ),
          phone: new FormControl(this.selectedUser.phone, Validators.required),
          password: new FormControl(this.selectedUser.password),
          created: new FormControl(
            this.selectedUser.created,
            Validators.required
          ),
          updated: new FormControl(
            this.selectedUser.updated,
            Validators.required
          ),
        });
      },
      (err) => {
        this.content = JSON.parse(err.error).message;
      }
    );
    this.isShown = !this.isShown;

  }
  saveUser() {
    console.log('saveuser user');
    console.log(this.formUser.value);
    this.userService.updateUser(this.formUser.value).subscribe();
    this.isShown = !this.isShown;
    window.location.reload();
  }
  deleteUser(id:number) {
    console.log("deleteuser");
    this.userService.deleteUser(id).subscribe();
    window.location.reload();
  }
}
