import { Invoice } from './../../models/invoice';
import { Component, OnInit } from '@angular/core';
import { InvoiceService } from 'src/app/services/invoice.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.css']
})
export class AddInvoiceComponent implements OnInit {

  invoice: Invoice = new Invoice();

  constructor(private _invoiceService: InvoiceService,
              private _router: Router,
              private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const isIdPresent = this._activatedRoute.snapshot.paramMap.has('id');
    if (isIdPresent) {
        const id = +this._activatedRoute.snapshot.paramMap.get('id');
        this._invoiceService.getInvoice(id).subscribe(
          data => this.invoice = data 
        )
    }
  }

  saveInvoice() {
    this._invoiceService.saveInvoice(this.invoice).subscribe(
      data => {
        console.log('response', data);
        this._router.navigateByUrl("/invoices");
      }
    )
  }

  deleteInvoice(id: number) {
    this._invoiceService.deleteInvoice(id).subscribe(
      data => {
        console.log('deleted response', data);
        this._router.navigateByUrl('/invoices');
      }
    )
  }

}