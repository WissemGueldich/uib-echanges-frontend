import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Job } from '../models/job';
import { JobConfigs } from '../models/jobConfig';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private API_URL=environment.BASE_URL+"jobs";

  constructor(private _httpClient: HttpClient) { }

  getJobs(): Observable<Job[]> {
    return this._httpClient.get<Job[]>(this.API_URL).pipe(
      map(response => response)
    )
  }

  saveJob(jobConfigs: JobConfigs): Observable<Job> {
    return this._httpClient.post<Job>(this.API_URL, jobConfigs);
  }

  updateJob(jobConfigs: JobConfigs): Observable<Job> {
    return this._httpClient.put<Job>(this.API_URL, jobConfigs);
  }

  getJob(id: number): Observable<JobConfigs> {
    return this._httpClient.get<JobConfigs>(`${this.API_URL}/${id}`).pipe(
      map(response => response)
    )
  }

  deleteJob(id: number): Observable<any> {
    return this._httpClient.delete(`${this.API_URL}/${id}`, {responseType: 'text'});
  }

  schedule(jobId:number): Observable<any> {
    return this._httpClient.post<any>(this.API_URL+"/schedule/"+jobId,null);
  }

  unschedule(jobId:number): Observable<any> {
    return this._httpClient.post<any>(this.API_URL+"/unschedule/"+jobId,null);
  }

}
