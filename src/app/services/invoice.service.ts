import { Invoice } from './../models/invoice';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private getUrl: string = "http://localhost:8081/invoices/getall";
  private getoneUrl: string = "http://localhost:8081/invoices/getone";
  private addUrl: string = "http://localhost:8081/invoices/add";
  private updateUrl: string = "http://localhost:8081/invoices/update";
  private deleteUrl: string = "http://localhost:8081/invoices/delete";

  constructor(private _httpClient: HttpClient) { }
  getInvoices(): Observable<Invoice[]> {
    return this._httpClient.get<Invoice[]>(this.getUrl).pipe(
      map(response => response)
    )
  }
  saveInvoice(invoice: Invoice): Observable<Invoice> {
    return this._httpClient.post<Invoice>(this.addUrl, invoice);
  }

  getInvoice(id: number): Observable<Invoice> {
    return this._httpClient.get<Invoice>(`${this.getoneUrl}/${id}`).pipe(
      map(response => response)
    )
  }

  deleteInvoice(id: number): Observable<any> {
    return this._httpClient.delete(`${this.deleteUrl}/${id}`, {responseType: 'text'});
  }
}
