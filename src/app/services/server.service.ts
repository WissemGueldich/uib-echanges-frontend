
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Server } from '../models/server';


@Injectable({
  providedIn: 'root'
})
export class ServerService {
  private SERVER_URL = environment.BASE_URL+"servers/";

  constructor(private _httpClient: HttpClient) { }
  
  getServers(): Observable<Server[]> {
    return this._httpClient.get<Server[]>(this.SERVER_URL).pipe(
      map(response => response)
    )
    
  }
  saveServer(Server: Server): Observable<Server> {
    return this._httpClient.post<Server>(this.SERVER_URL, Server);
  }

  getServer(id: number): Observable<Server> {
    return this._httpClient.get<Server>(`${this.SERVER_URL}/${id}`).pipe(
      map(response => response)
    )
  }

  deleteServer(id: number): Observable<any> {
    return this._httpClient.delete(`${this.SERVER_URL}/${id}`, {responseType: 'text'});
  }
}
