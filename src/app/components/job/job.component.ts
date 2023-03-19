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
