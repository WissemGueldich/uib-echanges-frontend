import { Invoice } from './../../models/invoice';
import { Component, OnInit } from '@angular/core';
import { InvoiceService } from 'src/app/services/invoice.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-list-invoices',
  templateUrl: './list-invoices.component.html',
  styleUrls: ['./list-invoices.component.css']
})
export class ListInvoicesComponent implements OnInit {
  invoices: Invoice[] = [];
  filters = {
    keyword: '',
    sortBy: 'Name'
  }


  constructor(private _invoiceService: InvoiceService) { }

  ngOnInit(): void {
    this.listInvoices();
  }
  deleteInvoice(id: number) {
    this._invoiceService.deleteInvoice(id).subscribe(
      data => {
        console.log('deleted response', data);
        this.listInvoices();
      }
    )
  }

  listInvoices() {
    this._invoiceService.getInvoices().subscribe(
      data => this.invoices = this.filterInvoices(data)
    )
  }

  filterInvoices(invoices: Invoice[]) {
    return invoices.filter((e) => {
      return e.invoiceDate.toLowerCase().includes(this.filters.keyword.toLowerCase());
    }).sort((a, b) => {
      if (this.filters.sortBy === 'date') {
        return a.invoiceDate.toLowerCase() > b.invoiceDate.toLowerCase() ? -1: 1;
      }else if(this.filters.sortBy === 'id') {
        return a.id > b.id ? -1: 1;
      }
    })
  }
}
