import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transfer } from '../models/transfer';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Page } from '../models/page';

@Injectable({
  providedIn: 'root'
})
export class TransferSupervisionService {

  private TRANSFER_URL = environment.BASE_URL+"transfer";

  constructor(private _httpClient: HttpClient) { }
  
  getTransfers(): Observable<Transfer[]> {
    return this._httpClient.get<Transfer[]>(this.TRANSFER_URL).pipe(
      map(response => response)
    )
  }

  getPaginatedTransfers(pageNumber: number, pageSize: number): Observable<Page<Transfer>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this._httpClient.get<Page<Transfer>>(this.TRANSFER_URL, { params });
  }
  
  saveTransfer(Transfer: Transfer): Observable<Transfer> {
    return this._httpClient.post<Transfer>(this.TRANSFER_URL, Transfer);
  }

  updateTransfer(Transfer: Transfer): Observable<Transfer> {
    return this._httpClient.put<Transfer>(this.TRANSFER_URL, Transfer);
  }

  getTransfer(id: number): Observable<Transfer> {
    return this._httpClient.get<Transfer>(`${this.TRANSFER_URL}/${id}`).pipe(
      map(response => response)
    )
  }

  deleteTransfer(id: number): Observable<any> {
    return this._httpClient.delete(`${this.TRANSFER_URL}/${id}`, {responseType: 'text'});
  }

  deleteTransfersBetween(from: Date, to: Date){
    let dateBetween={startDate:from,endDate:to};
    return this._httpClient.delete(`${this.TRANSFER_URL}`, {body:dateBetween});
  }
}
