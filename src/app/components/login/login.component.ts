import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/security/auth.service';
import { TokenStorageService } from 'src/app/security/token-storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  subscribe : Subject<boolean> = new Subject();

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
      this.roles = this.tokenStorage.getUser().authorities;
    }
  }

  onSubmit(): void {
    const { matricule, password } = this.form;
    this.authService.login(matricule, password).pipe(takeUntil(this.subscribe)).subscribe(
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

  ngOnDestroy() {
    this.subscribe.next(true);
  }

}