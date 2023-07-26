import { Component, OnInit } from '@angular/core';
import { AuthService } from './security/auth.service';
import { TokenStorageService } from './security/token-storage.service';
import { Subject, takeUntil } from 'rxjs';



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
  username?: string;

  constructor(private tokenStorageService: TokenStorageService, public authService: AuthService) { }

  subscribe : Subject<boolean> = new Subject();


  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      this.authService.verifyToken().pipe(takeUntil(this.subscribe)).subscribe(
        data=>{},
        error=>{
          if (error.status==401) {
            this.tokenStorageService.signOut();
            this.isLoggedIn=false;
          }
        }
      )
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
  ngOnDestroy() {
    this.subscribe.next(true);
  }
}
