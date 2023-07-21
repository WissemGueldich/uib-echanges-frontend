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
      this.listJobs();
    });
  }

  listJobs() {
    this._jobService.getJobs().subscribe((data) => {
      this.jobs = data;
      console.log(data);
      
      this.jobs.forEach(job=>{
        job.days.sort((a, b) => a.id - b.id); 
      });
      console.log(this.jobs);
      
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

  schedule(jobId:number) {
    this._jobService.schedule(jobId).subscribe((data) => {
      console.log('data from schedule service : ', data);
    });
  }

  idToDay(day: number) {
    switch (day) {
      case 2:
        return 'Lundi';
      case 3:
        return 'Mardi';
      case 4:
        return 'Mercredi';
      case 5:
        return 'Jeudi';
      case 6:
        return 'Vendredi';
      case 7:
        return 'Samedi';
      case 1:
        return 'Dimanche';
      default:
        return '';
    }
  }
}
