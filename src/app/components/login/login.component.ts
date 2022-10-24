import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/security/auth.service';
import { TokenStorageService } from 'src/app/security/token-storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    matricule: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn=true;
      console.log("this is coming from login")
      console.log(this.isLoggedIn)
      this.roles = this.tokenStorage.getUser().authorities;
      console.log(this.tokenStorage.getUser())
    }
  }

  onSubmit(): void {
    const { matricule, password } = this.form;
    this.authService.login(matricule, password).subscribe(
      data => {
        console.log(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().authorities;
        window.location.href='/login'
      },
      err => {
        console.log(err);
        this.isLoginFailed = true;
      }
    );
  }

}