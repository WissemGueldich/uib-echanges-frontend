import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private API_URL=environment.BASE_URL+"jobs/";

  constructor(private _httpClient: HttpClient) { }

  schedule(): Observable<any> {
    return this._httpClient.post<any>(this.API_URL+"schedule",3);
  }
}
