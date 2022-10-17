import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

const API_URL = 'http://localhost:8081/api/';
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
    return this.http.get('http://localhost:8081/user/getusers', { responseType: 'json' });
  }

  getUser(id):Observable<any> {
    return this.http.get('http://localhost:8081/user/getuser/'+id, { responseType: 'json' });
  }
  
  updateUser(user):Observable<any> {
    return this.http.put('http://localhost:8081/user/updateuser', user );
  }

  deleteUser(id):Observable<any> {
    return this.http.delete( 'http://localhost:8081/user/deleteuser/'+id, { responseType: 'json' });
  }
}