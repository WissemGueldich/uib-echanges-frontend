import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Configuration } from '../models/configuration';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

private API_URL=environment.BASE_URL+"configs";

  constructor(private _httpClient: HttpClient) { }
  getConfigurations(): Observable<Configuration[]> {
    return this._httpClient.get<Configuration[]>(this.API_URL).pipe(
      map(response => response)
    )
  }
  saveConfiguration(Configuration: Configuration): Observable<Configuration> {
    return this._httpClient.post<Configuration>(this.API_URL, Configuration);
  }

  updateConfiguration(Configuration: Configuration): Observable<Configuration> {
    return this._httpClient.put<Configuration>(this.API_URL, Configuration);
  }

  getConfiguration(id: number): Observable<Configuration> {
    return this._httpClient.get<Configuration>(`${this.API_URL}/${id}`).pipe(
      map(response => response)
    )
  }

  deleteConfiguration(id: number): Observable<any> {
    return this._httpClient.delete(`${this.API_URL}/${id}`, {responseType: 'text'});
  }
}
