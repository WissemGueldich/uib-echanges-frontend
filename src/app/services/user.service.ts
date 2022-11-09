import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL=environment.BASE_URL+"users";

  constructor(private _httpClient: HttpClient) { }
  getUsers(): Observable<User[]> {
    return this._httpClient.get<User[]>(this.API_URL).pipe(
      map(response => response)
    )
  }
  saveUser(User: User): Observable<User> {
    return this._httpClient.post<User>(this.API_URL, User);
  }

  updateUser(User: User): Observable<User> {
    return this._httpClient.put<User>(this.API_URL, User);
  }

  getUser(id: number): Observable<User> {
    return this._httpClient.get<User>(`${this.API_URL}/${id}`).pipe(
      map(response => response)
    )
  }

  getUserByMatricule(matricule: string): Observable<User> {
    return this._httpClient.get<User>(`${this.API_URL}/m/${matricule}`).pipe(
      map(response => response)
    )
  }

  deleteUser(id: number): Observable<any> {
    return this._httpClient.delete(`${this.API_URL}/${id}`, {responseType: 'text'});
  }
}