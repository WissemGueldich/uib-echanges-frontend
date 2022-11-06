import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/security/auth.service';
import { TokenStorageService } from 'src/app/security/token-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private tokenStorage: TokenStorageService, public authService: AuthService) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.tokenStorage.signOut();
  }

}
