import { Component, OnInit } from '@angular/core';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {

  constructor(private _jobService: JobService) { }

  ngOnInit(): void {
  }

  schedule(){
    this._jobService.schedule().subscribe(
      data => {
        console.log('data from schedule service : ', data);
      }
    )
  }
}
