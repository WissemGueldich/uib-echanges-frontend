import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Profile } from '../models/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private API_URL=environment.BASE_URL+"profiles";

  constructor(private _httpClient: HttpClient) { }
  getProfiles(): Observable<Profile[]> {
    return this._httpClient.get<Profile[]>(this.API_URL).pipe(
      map(response => response)
    )
  }

  getProfilesByUserId(id: number): Observable<Profile[]> {
    return this._httpClient.get<Profile[]>(this.API_URL+"/user/"+id).pipe(
      map(response => response)
    )
  }

  saveProfile(Profile: Profile): Observable<Profile> {
    return this._httpClient.post<Profile>(this.API_URL, Profile);
  }

  updateProfile(Profile: Profile): Observable<Profile> {
    return this._httpClient.put<Profile>(this.API_URL, Profile);
  }

  getProfile(id: number): Observable<Profile> {
    return this._httpClient.get<Profile>(`${this.API_URL}/${id}`).pipe(
      map(response => response)
    )
  }

  deleteProfile(id: number): Observable<any> {
    return this._httpClient.delete(`${this.API_URL}/${id}`, {responseType: 'text'});
  }
}
