import { Component, OnInit } from '@angular/core';
import { Transfer } from 'src/app/models/transfer';
import { TransferSupervisionService } from 'src/app/services/transfer-supervision.service';

@Component({
  selector: 'app-settings',
  templateUrl: './transfer-supervision.component.html',
  styleUrls: ['./transfer-supervision.component.scss']
})
export class TransferSupervisionComponent implements OnInit {

  constructor(private _transferSupervisionService: TransferSupervisionService ) { };

  transfers: Transfer[] = [];
  
  filters = {
    keyword: '',
    sortBy: 'Name'
  }

  ngOnInit(): void {
    this.listTransfers();
  }

  deleteTransfer(id: number) {
    this._transferSupervisionService.deleteTransfer(id).subscribe(
      data => {
        console.log('deleted response', data);
        this.listTransfers();
      }
    )
  }

  listTransfers() {
    this._transferSupervisionService.getTransfers().subscribe(
      data => this.transfers = data
    )
  }

  listener(){
    this.listTransfers();
  }

  filterTransfer(Transfer: Transfer[]) {
    // return Transfer.filter((e) => {
    //   return e.TransferDate.toLowerCase().includes(this.filters.keyword.toLowerCase());
    // }).sort((a, b) => {
    //   if (this.filters.sortBy === 'date') {
    //     return a.TransferDate.toLowerCase() > b.TransferDate.toLowerCase() ? -1: 1;
    //   }else if(this.filters.sortBy === 'id') {
    //     return a.id > b.id ? -1: 1;
    //   }
    // })
  }
}


