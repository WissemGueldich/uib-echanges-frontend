import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Profile } from 'src/app/models/profile';
import { User } from 'src/app/models/user';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  subscribe : Subject<boolean> = new Subject();

  profiles: Profile[] = [];

  constructor(private _profileService: ProfileService) {}

  ngOnInit(): void {
    this.listProfiles();
  }

  deleteProfile(id: number) {
    this._profileService.deleteProfile(id).pipe(takeUntil(this.subscribe)).subscribe((data) => {
      this.listProfiles();
    });
  }

  listProfiles() {
    this._profileService
      .getProfiles().pipe(takeUntil(this.subscribe)).subscribe((data) => (this.profiles = data));
  }

  listener() {
    this.listProfiles();
  }

  filters = {
    keyword: '',
    sortBy: 'id',
    order: 'desc'
  }
  
  sort(sortBy: string){
    if (this.filters.sortBy==sortBy) {
      this.filters.order=='desc'? this.filters.order='asc':this.filters.order='desc';
    }else{
      this.filters.sortBy=sortBy;
      this.filters.order='desc'
    }
  }

  getUsersByProfileId(id:number){
    this._profileService.getUsersByProfileId(id).pipe(takeUntil(this.subscribe)).subscribe(
      data => {
        console.log(data);
        return data;
      }
    )
  }

  delete(profile: Profile) {
    this._profileService.getUsersByProfileId(profile.id).pipe(takeUntil(this.subscribe)).subscribe(
      data => {
        if (data.length==0){
          if (confirm('êtes vous sure de vouloir supprimer le profile "'+profile.libelle+'" ?')) {
            this.deleteProfile(profile.id);
          }
        }else{
          let s="";
          for (let d in data){
            s=s+"\n"+data[d].matricule;
          } 
          if (confirm('êtes vous sure de vouloir supprimer le profile "'+profile.libelle+'" ?\n'+"les utilisateurs suivants ont ce profile:"+s)) {
            this.deleteProfile(profile.id);
          }
        }
      }
    )
  }
  ngOnDestroy() {
    this.subscribe.next(true);
  }
}
