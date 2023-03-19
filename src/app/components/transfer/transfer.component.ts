import { Component, OnInit } from '@angular/core';
import { Configuration } from 'src/app/models/configuration';
import { Profile } from 'src/app/models/profile';
import { User } from 'src/app/models/user';
import { TokenStorageService } from 'src/app/security/token-storage.service';
import { TransferService } from 'src/app/services/transfer.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {

  constructor(private _transferService: TransferService, private _tokenService: TokenStorageService, private _userService: UserService) { }

  show:boolean = false;
  user:User=new User;
  configs:Configuration[] = [];
  message:string = "Inactif";
  error:boolean = false;
  disable:boolean = false;
  ngOnInit(): void {
    this._userService.getUserByMatricule(this._tokenService.getUser().username).subscribe(
      data => {
        console.log(data);
        this.user=data
        data.profiles.forEach((profile: Profile )=>{
          this.configs=this.configs.concat(profile.configurations);
        })     
      }
    );
  }

  transfer(config:Configuration) {
    config.message = "En Cours ..."
    config.show = false;
    config.error = false ;
    config.disable = true ;
    this._transferService.transfer(config).subscribe(
      data => {
        config.error=false;
        config.show = true;
        config.message="Transfert éffectué avec succès"
        config.disable = false;
        console.log("resp");
        console.log(data);
      },
      error =>{
        config.error=true;
        config.show=true ;
        config.message = error.error.text ? error.error.text.split('/')[0] : "Problème serveur."
        config.disable = false;
      }
    )
  }

}
