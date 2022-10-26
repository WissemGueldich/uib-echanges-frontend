import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SystemUser } from '../models/systemUser';

@Injectable({
  providedIn: 'root'
})
export class SystemUserService {

  private API_URL=environment.BASE_URL+"systemUsers";

  constructor(private _httpClient: HttpClient) { }
  getSystemUsers(): Observable<SystemUser[]> {
    return this._httpClient.get<SystemUser[]>(this.API_URL).pipe(
      map(response => response)
    )
  }
  saveSystemUser(SystemUser: SystemUser): Observable<SystemUser> {
    return this._httpClient.post<SystemUser>(this.API_URL, SystemUser);
  }

  updateSystemUser(SystemUser: SystemUser): Observable<SystemUser> {
    return this._httpClient.put<SystemUser>(this.API_URL, SystemUser);
  }

  getSystemUser(id: number): Observable<SystemUser> {
    return this._httpClient.get<SystemUser>(`${this.API_URL}/${id}`).pipe(
      map(response => response)
    )
  }

  deleteSystemUser(id: number): Observable<any> {
    return this._httpClient.delete(`${this.API_URL}/${id}`, {responseType: 'text'});
  }
}
