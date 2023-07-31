import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Configuration } from 'src/app/models/configuration';
import { Profile } from 'src/app/models/profile';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/security/auth.service';
import { TokenStorageService } from 'src/app/security/token-storage.service';
import { TransferService } from 'src/app/services/transfer.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit, OnDestroy {

  subscribe : Subject<boolean> = new Subject();

  constructor(private _transferService: TransferService, private _tokenService: TokenStorageService, private _userService: UserService, private _authService: AuthService) { }

  show:boolean = false;
  user:User=new User;
  configs:Configuration[] = [];
  message:string = "Inactif";
  error:boolean = false;
  disable:boolean = false;
  ngOnInit(): void {
    const token = this._tokenService.getToken();
    if (token!=null) {
        this._userService.getUserByMatricule(this._authService.getUser(token).sub).pipe(takeUntil(this.subscribe)).subscribe(
        data => {     
          this.user=data
          data.profiles.forEach((profile: Profile )=>{
            this.configs=this.configs.concat(profile.configurations);
          })     
        }
      );
    }
    
  }

  transfer(config:Configuration) {
    config.message = "En Cours ..."
    config.show = false;
    config.error = false ;
    config.disable = true ;
    this._transferService.transfer(config).subscribe(
      () => {
        config.error=false;
        config.show = true;
        config.message="Transfert éffectué avec succès"
        config.disable = false;
      },
      error =>{
        config.error=true;
        config.show=true ;
        config.message = error.error.text ? error.error.text.split('/')[0] : "Problème serveur."
        config.disable = false;
      }
    )
  }
  ngOnDestroy() {
    this.subscribe.next(true);
  }

}
