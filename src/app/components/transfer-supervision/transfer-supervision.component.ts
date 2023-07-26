import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Transfer } from 'src/app/models/transfer';
import { TransferSupervisionService } from 'src/app/services/transfer-supervision.service';

@Component({
  selector: 'app-settings',
  templateUrl: './transfer-supervision.component.html',
  styleUrls: ['./transfer-supervision.component.scss']
})
export class TransferSupervisionComponent implements OnInit, OnDestroy {
  subscribe : Subject<boolean> = new Subject();


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
    if (confirm('êtes vous sure de vouloir supprimer ?\n cette action est irreversible')) {
      this._transferSupervisionService.deleteTransfer(id).pipe(takeUntil(this.subscribe)).subscribe(
        data => {
          console.log('deleted response', data);
          this.listTransfers();
        }
      )
    }
  }

  listTransfers() {
    this._transferSupervisionService.getTransfers().pipe(takeUntil(this.subscribe)).subscribe(
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
  ngOnDestroy() {
    this.subscribe.next(true);
  }
}


