import { ReturnStatement } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Job } from 'src/app/models/job';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
})
export class JobComponent implements OnInit, OnDestroy {
  subscribe : Subject<boolean> = new Subject();
  jobs: Job[] = [];
  days: string[] = [];
  filters = {
    keyword: '',
    sortBy: 'Name',
  };
  constructor(private _jobService: JobService) {}

  ngOnInit(): void {
    this.listJobs();
  }

  deleteJob(id: number) {
    if (confirm('êtes vous sure de voiloir supprimer ?\n cette action est irreversible')) {
      this._jobService.deleteJob(id).pipe(takeUntil(this.subscribe)).subscribe((data) => {
        this.listJobs();    
      });
    }
  }

  listJobs() {
    this._jobService.getJobs().pipe(takeUntil(this.subscribe)).subscribe((data) => {
      this.jobs = data;
      
      this.jobs.forEach(job=>{
        job.days.sort((a, b) => a.id - b.id);
      });
      
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
    this._jobService.schedule(jobId).pipe(takeUntil(this.subscribe)).subscribe();
    this.listJobs();
  }

  unschedule(jobId:number) {
    this._jobService.unschedule(jobId).pipe(takeUntil(this.subscribe)).subscribe();
    this.listJobs();
  }

  isRunning(jobId:number) {
    this._jobService.unschedule(jobId).pipe(takeUntil(this.subscribe)).subscribe((data) => {
      return data.isScheduled;
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
  ngOnDestroy() {
    this.subscribe.next(true);
  }
}
