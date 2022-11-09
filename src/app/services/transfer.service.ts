import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Configuration } from '../models/configuration';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  private API_URL=environment.BASE_URL+"transfer";

  constructor(private _httpClient: HttpClient) { }
  transfer(configuration : Configuration): Observable<any> {
    return this._httpClient.post<Configuration>(this.API_URL, configuration);
  }
}
