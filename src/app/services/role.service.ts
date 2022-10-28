import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Permission } from '../models/permission';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private API_URL=environment.BASE_URL+"roles";

  constructor(private _httpClient: HttpClient) { }
  getRoles(): Observable<Role[]> {
    return this._httpClient.get<Role[]>(this.API_URL).pipe(
      map(response => response)
    )
  }
  saveRole(role: Role): Observable<Role> {
    return this._httpClient.post<Role>(this.API_URL, role);
  }

  updateRole(role: Role): Observable<Role> {
    return this._httpClient.put<Role>(this.API_URL, role);
  }

  getRole(id: number): Observable<Role> {
    return this._httpClient.get<Role>(`${this.API_URL}/${id}`).pipe(
      map(response => response)
    )
  }

  deleteRole(id: number): Observable<any> {
    return this._httpClient.delete(`${this.API_URL}/${id}`, {responseType: 'text'});
  }

  getPermissions(): Observable<Permission[]> {
    return this._httpClient.get<Permission[]>(this.API_URL+"/permissions").pipe(
      map(response => response)
    )
  }
}
