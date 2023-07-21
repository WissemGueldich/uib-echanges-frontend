import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Configuration } from 'src/app/models/configuration';
import { Profile } from 'src/app/models/profile';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { ProfileService } from 'src/app/services/profile.service';
@Component({
  selector: 'app-profile-modal',
  templateUrl: './profile-modal.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
      .dark-modal .modal-content {
        background-color: #292b2c;
        color: white;
      }
      .dark-modal .close {
        color: white;
      }
      .light-blue-backdrop {
        background-color: #5cb3fd;
      }
    `,
  ],
})
export class ProfileModalComponent implements OnInit {
  closeResult!: string;
  @Input() title!: string;
  @Input() profileId!: string;
  @Output() update = new EventEmitter();
  icon = false;
  profile: Profile = new Profile();
  configurations: Configuration[] = [];
  dropdownList: any = [];
  selectedItems: Configuration[] = [];
  dropdownSettings: IDropdownSettings = {};

  constructor(
    private modalService: NgbModal,
    private _profileService: ProfileService,
    private _configurationService: ConfigurationService,
    private _router: Router
  ) {}
  ngOnInit(): void {
    if (this.title == 'Ajouter') this.icon = true;
    this._configurationService.getConfigurations().subscribe((data) => {
      this.configurations = data;
      data.forEach((configuration) => {
        this.dropdownList.push({
          id: configuration.id,
          libelle: configuration.libelle,
        });
      });
    });
    this.selectedItems = [];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'libelle',
      selectAllText: 'Selectionner tout',
      unSelectAllText: 'Désélectionner tout',
      itemsShowLimit: 10,
      allowSearchFilter: true,
    };
  }
  onItemSelect(item: any) {}
  onSelectAll(items: any) {}

  profileForm = new FormGroup({
    id: new FormControl(0,{nonNullable: true}),
    libelle: new FormControl('', [
      Validators.required,
      Validators.maxLength(40),
    ]),
    configurations: new FormControl(this.profile.configurations, [
      Validators.required,
    ]),
  });

  saveProfile() {
    this._profileService.saveProfile(this.profile).subscribe((data) => {
      this._router.navigateByUrl('/profiles');
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.profile.libelle = this.profileForm.value.libelle!;
      this.profile.id = this.profileForm.value.id!;
      this.profile.configurations = this.profileForm.value.configurations!;

      if (this.profile.id != 0) {
        this._profileService.updateProfile(this.profile).subscribe((data) => {
          this.update.emit();
        });
      } else {
        this._profileService.saveProfile(this.profile).subscribe((data) => {
          this.update.emit();
        });
      }
    this.profileForm.reset();
    }
  }

  deleteProfile(id: number) {
    this._profileService.deleteProfile(id).subscribe((data) => {
      this._router.navigateByUrl('/profiles');
    });
  }

  openVerticallyCentered(content: any) {
    if (this.profileId != '') {
      this._profileService.getProfile(+this.profileId).subscribe((data) => {
        this.profile.id = data.id;
        this.profile.libelle = data.libelle;
        this.profile.configurations = data.configurations;
        this.profileForm.setValue({
          id: this.profile.id,
          libelle: this.profile.libelle,
          configurations: this.profile.configurations,
        });
      });
    }
    this.modalService.open(content, { centered: true });
  }
}
