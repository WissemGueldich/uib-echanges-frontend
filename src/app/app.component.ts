import { Component, OnInit } from '@angular/core';
import { AuthService } from './security/auth.service';
import { TokenStorageService } from './security/token-storage.service';



interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'uibechanges2';
  isSideNavCollapsed = false;
  screenWidth = 0;

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showUserBoard = false;
  username?: string;

  constructor(private tokenStorageService: TokenStorageService, public authService: AuthService) { }

  ngOnInit(): void {
    console.log("this is coming from layout")
    console.log(this.isLoggedIn)
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    console.log(this.isLoggedIn)

    if (this.isLoggedIn) {
      // const user = this.tokenStorageService.getUser();
      // console.log(user)

      // this.roles = user.authorities;
      // this.showUserBoard =!this.roles.includes('ROLE_ADMIN');
      // this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      // this.username = user.username;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
