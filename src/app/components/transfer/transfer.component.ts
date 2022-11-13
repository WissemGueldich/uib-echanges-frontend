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
  message!:string;
  error:boolean = false;
  ngOnInit(): void {
    this._userService.getUserByMatricule(this._tokenService.getUser().username).subscribe(
      data => {
        console.log(data);
        this.user=data
        data.profiles.forEach((profile: Profile )=>{
          this.configs = profile.configurations;
        })     
      }
    );
  }

  transfer(config:Configuration) {
    this._transferService.transfer(config).subscribe(
      data => {
        this.error=false;
        this.show=true ;
        this.message="Transfert éffectué avec succès"
      },
      error =>{
        this.error=true;
        this.show=true ;
        this.message = error.error;
      }
    )
  }

}
