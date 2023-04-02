import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { UserModel } from '../models/user.model';
import { ApiService } from './api.service';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
isLoggedIn$ = this._isLoggedIn$.asObservable();
  user!: UserModel;

  constructor(private apiService : ApiService, private tokenStorageService: TokenStorageService) {
    const token = tokenStorageService.getToken();
    this._isLoggedIn$.next(!!token);
    if (token!=null) {
      this.user = this.getUser(token);
    }
   }

  login(matricule: string, password: string){
    return this.apiService.login(matricule, password).pipe(
        tap((response: any)=>{
          this._isLoggedIn$.next(true);
          this.tokenStorageService.saveToken(response.token);
          this.user = this.getUser(response.token);
        })
    );
  }

  register(matricule: string, email: string, password: string, firstName: string, lastName: string){
    return this.apiService.register(matricule, email, password ,firstName, lastName).pipe(
      tap((response: any)=>{
      })
    );
  }

  verifyToken():Observable<any[]> {
    return this.apiService.verifyToken().pipe(
      map(response => response)
    )
  }

  getUser(token:string):UserModel{
    return JSON.parse(atob(token.split('.')[1])) as UserModel;
  }

}