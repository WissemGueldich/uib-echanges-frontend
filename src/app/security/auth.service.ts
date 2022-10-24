import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiService } from './api.service';
import { TokenStorageService } from './token-storage.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(private apiService : ApiService, private tokenStorageService: TokenStorageService) {
    const token = tokenStorageService.getToken();
    this._isLoggedIn$.next(!!token);
   }

  login(matricule: string, password: string){
    return this.apiService.login(matricule, password).pipe(
        tap((response: any)=>{
          this._isLoggedIn$.next(true);
          this.tokenStorageService.saveToken(response.token);
          this.tokenStorageService.saveUser(response);
        })
    );
  }

  register(matricule: string, email: string, password: string, firstName: string, lastName: string){
    return this.apiService.register(matricule, email, password ,firstName, lastName).pipe(
      tap((response: any)=>{
      })
    );
  }

}