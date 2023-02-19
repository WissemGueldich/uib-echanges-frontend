import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Job } from 'src/app/models/job';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
})
export class JobComponent implements OnInit {
  jobs: Job[] = [];
  days: string[] = [];
  filters = {
    keyword: '',
    sortBy: 'Name',
  };

  constructor(private _jobService: JobService, private _router: Router) {}

  ngOnInit(): void {
    this.listJobs();
  }

  deleteJob(id: number) {
    this._jobService.deleteJob(id).subscribe((data) => {
      console.log('deleted response', data);
      this.listJobs();
    });
  }

  listJobs() {
    this._jobService.getJobs().subscribe((data) => {
      console.log(data);
      this.jobs = data;
    });
  }

  listener() {
    this.listJobs();
  }

  filterJobs(jobs: Job[]) {
    // return Jobs.filter((e) => {
    //   return e.JobDate.toLowerCase().includes(this.filters.keyword.toLowerCase());
    // }).sort((a, b) => {
    //   if (this.filters.sortBy === 'date') {
    //     return a.JobDate.toLowerCase() > b.JobDate.toLowerCase() ? -1: 1;
    //   }else if(this.filters.sortBy === 'id') {
    //     return a.id > b.id ? -1: 1;
    //   }
    // })
  }

  schedule() {
    this._jobService.schedule().subscribe((data) => {
      console.log('data from schedule service : ', data);
    });
  }

  dayToDayFr(day: string) {
    switch (day) {
      case 'MON':
        return 'Lundi';
      case 'TUE':
        return 'Mardi';
      case 'WED':
        return 'Mercredi';
      case 'THU':
        return 'Jeudi';
      case 'FRI':
        return 'Vendredi';
      case 'SAT':
        return 'Samedi';
      case 'SUN':
        return 'Dimanche';
      default:
        return '';
    }
  }
}
