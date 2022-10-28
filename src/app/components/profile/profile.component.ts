import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/models/profile';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profiles: Profile[] = [];
  filters = {
    keyword: '',
    sortBy: 'Name'
  }

  constructor(private _profileService: ProfileService ) { }

  ngOnInit(): void {
    this.listProfiles();
  }

  deleteProfile(id: number) {
    this._profileService.deleteProfile(id).subscribe(
      data => {
        console.log('deleted response', data);
        this.listProfiles();
      }
    )
  }

  listProfiles() {
    this._profileService.getProfiles().subscribe(
      data => this.profiles = data
    )
  }

  filterProfiles(configs: Profile[]) {
    // return Profiles.filter((e) => {
    //   return e.ProfileDate.toLowerCase().includes(this.filters.keyword.toLowerCase());
    // }).sort((a, b) => {
    //   if (this.filters.sortBy === 'date') {
    //     return a.ProfileDate.toLowerCase() > b.ProfileDate.toLowerCase() ? -1: 1;
    //   }else if(this.filters.sortBy === 'id') {
    //     return a.id > b.id ? -1: 1;
    //   }
    // })
  }

}
