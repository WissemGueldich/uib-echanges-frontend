import { Component, Input } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
	selector: 'simple-modal',
	standalone: false,
	templateUrl: './simple-modal.component.html',
	providers: [NgbModalConfig, NgbModal],
})
export class SimpleModalComponent {

  @Input() profileId!: string;
  @Input() profileName!: string;

  users : User[]=[];

	constructor(config: NgbModalConfig, private modalService: NgbModal, private _profileService: ProfileService) {
		config.backdrop = 'static';
		config.keyboard = false;
	}


	open(content:any) {
    this._profileService.getUsersByProfileId(+this.profileId).subscribe(
      data => {
        this.users=data;
      }
    )
		this.modalService.open(content,{ centered: true });
	}
}