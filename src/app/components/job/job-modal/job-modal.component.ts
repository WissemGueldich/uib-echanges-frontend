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
import { Job } from 'src/app/models/job';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-job-modal',
  templateUrl: './job-modal.component.html',
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
export class JobModalComponent implements OnInit {
  closeResult!: string;
  @Input() title!: string;
  @Input() jobId!: string;
  @Output() update = new EventEmitter();
  icon = false;
  job: Job = new Job();
  configurations: Configuration[] = [];
  dropdownList: any = [];
  selectedItems: Configuration[] = [];
  dropdownSettings: IDropdownSettings = {};
  dropdownList1: any = [
    { id: 1, day: 'Lundi' },
    { id: 2, day: 'Mardi' },
    { id: 3, day: 'Mercredi' },
    { id: 4, day: 'Jeudi' },
    { id: 5, day: 'Vendredi' },
    { id: 6, day: 'Samedi' },
    { id: 7, day: 'Dimanche' },
  ];
  selectedItems1: Configuration[] = [];
  dropdownSettings1: IDropdownSettings = {};

  constructor(
    private modalService: NgbModal,
    private _jobService: JobService,
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
    this.selectedItems1 = [];
    this.dropdownSettings1 = {
      singleSelection: false,
      idField: 'id',
      textField: 'day',
      selectAllText: 'Selectionner tout',
      unSelectAllText: 'Désélectionner tout',
      itemsShowLimit: 10,
      allowSearchFilter: true,
    };
  }
  onItemSelect(item: any) {}
  onSelectAll(items: any) {}

  jobForm = new FormGroup({
    id: new FormControl(0),
    libelle: new FormControl('', [
      Validators.required,
      Validators.maxLength(40),
    ]),
    startHour: new FormControl('', [
      Validators.required,
      Validators.pattern('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$'),
    ]),
    endHour: new FormControl('', [
      Validators.required,
      Validators.pattern('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$'),
    ]),
    frequency: new FormControl(this.job.frequency, [
      Validators.required,
      Validators.pattern('^[1-9]*$'),
    ]),
    state: new FormControl(false),
    days: new FormControl(this.job.days, [Validators.required]),
    configurations: new FormControl(this.job.configurations, [
      Validators.required,
    ]),
  });

  savejob() {
    this._jobService.saveJob(this.job).subscribe((data) => {
      this._router.navigateByUrl('/jobs');
    });
  }

  onSubmit() {
    if (this.jobForm.valid){
      this.job.libelle = this.jobForm.value.libelle!;
      this.job.id = this.jobForm.value.id!;
      this.job.startHour = this.jobForm.value.startHour!;
      this.job.endHour = this.jobForm.value.endHour!;
      this.job.frequency = +this.jobForm.value.frequency!;
      this.job.state = this.jobForm.value.state!;
      this.job.days = this.jobForm.value.days!;
      this.job.configurations = this.jobForm.value.configurations!;

      if (this.job.id != 0) {
        this._jobService.updateJob(this.job).subscribe((data) => {
          this.update.emit();
        });
      } else {
        this._jobService.saveJob(this.job).subscribe((data) => {
          this.update.emit();
        });
      }
      this.jobForm.reset();
    }
  }

  deletejob(id: number) {
    this._jobService.deleteJob(id).subscribe((data) => {
      this._router.navigateByUrl('/jobs');
    });
  }

  openVerticallyCentered(content: any) {
    if (this.jobId != '') {
      this._jobService.getJob(+this.jobId).subscribe((data) => {
        this.job.id = data.id;
        this.job.libelle = data.libelle;
        this.job.startHour = data.startHour;
        this.job.endHour = data.endHour;
        this.job.frequency = data.frequency;
        this.job.state = data.state;
        this.job.days = [];
        data.days.forEach((day) => {
          day.day = this.idToDay(day.id);
          this.job.days.push(day);
        });
        this.job.configurations = []; //check this to link configs from jobConfigs
        this.jobForm.setValue({
          id: this.job.id,
          libelle: this.job.libelle,
          startHour: this.job.startHour,
          endHour: this.job.endHour,
          frequency: this.job.frequency,
          state: this.job.state,
          days: this.job.days,
          configurations: this.job.configurations,
        });
      });
    }
    this.modalService.open(content, { centered: true });
  }
  idToDay(day: number) {
    switch (day) {
      case 1:
        return 'Lundi';
      case 2:
        return 'Mardi';
      case 3:
        return 'Mercredi';
      case 4:
        return 'Jeudi';
      case 5:
        return 'Vendredi';
      case 6:
        return 'Samedi';
      case 7:
        return 'Dimanche';
      default:
        return '';
    }
  }
}
