import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


const AUTH_API = environment.BASE_URL + 'auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  login(matricule: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      matricule,
      password
    }, httpOptions);
  }

  register(matricule: string, email: string, password: string, firstName: string, lastName: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {matricule, email,
      password, firstName, lastName
    }, httpOptions);
  }

  verifyToken():Observable<any[]> {
    return this.http.get<any[]>(AUTH_API).pipe(
      map(response => response)
    )
  }
  
}
