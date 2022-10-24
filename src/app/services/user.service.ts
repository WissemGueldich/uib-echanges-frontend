import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from '../security/token-storage.service';

const API_URL = environment.BASE_URL+"users/";
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOption={
    headers:new HttpHeaders({"Content-Type":"application/json",}),
  }
  constructor(private http: HttpClient,private token: TokenStorageService) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }


  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

  getUsers():Observable<any> {
    return this.http.get(API_URL, { responseType: 'json' });
  }

  getUser(id: string | number):Observable<any> {
    return this.http.get(API_URL+id, { responseType: 'json' });
  }
  
  updateUser(user: any):Observable<any> {
    return this.http.put(API_URL, user );
  }

  deleteUser(id: string | number):Observable<any> {
    return this.http.delete( API_URL+id, { responseType: 'json' });
  }
}