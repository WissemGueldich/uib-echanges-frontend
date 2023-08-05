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

  pageNumber = 0;
  pageSize = 10;

  totalElements!:number;
  totalPages:number[]=[];
  numberOfPages!:number;
  empty!:boolean;
  first!:boolean;
  last!:boolean;
  number!:number;
  numberOfElements!:number;
  
  filters = {
    keyword: '',
    sortBy: 'Name'
  }

  ngOnInit(): void {
    this.loadPaginatedTransfers();
  }

  deleteTransfer(id: number, date: Date) {
    if(this.calculateDateDifferenceInDays(new Date(date))>30){
      if (confirm('êtes vous sure de vouloir supprimer ?\n cette action est irreversible')) {
        this._transferSupervisionService.deleteTransfer(id).pipe(takeUntil(this.subscribe)).subscribe(
          () => {
            this.loadPaginatedTransfers();
          }
        )
      }
    }
  }

  listTransfers() {
    this._transferSupervisionService.getTransfers().pipe(takeUntil(this.subscribe)).subscribe(
      data => this.transfers = data
    )
  }

  loadPaginatedTransfers() {
    this._transferSupervisionService.getPaginatedTransfers(this.pageNumber, this.pageSize)
    .pipe(takeUntil(this.subscribe)).subscribe(
        
        data => {
          this.transfers = data.content;
          this.totalElements=data.totalElements;
          this.empty=data.empty;
          this.first=data.first;
          this.last=data.last;
          this.number=data.number;
          this.numberOfElements=data.numberOfElements;
          this.numberOfPages=data.totalPages;
          if(this.totalPages.length<this.numberOfPages){
            for (let i = 0; i < this.numberOfPages; i++) {
              this.totalPages.push(i+1);
            }
          }
        },
        error => console.error('Error fetching data:', error)
      )
  }

  listener(){
    this.loadPaginatedTransfers();
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

  prevPage() {
    if (this.pageNumber > 0) {
      this.pageNumber--;
      this.loadPaginatedTransfers();
    }
  }
  
  nextPage() {
    this.pageNumber++;
    this.loadPaginatedTransfers();
  }

  getPage(pageNumber:number){
    this.pageNumber=pageNumber-1
    this.loadPaginatedTransfers();
  }

  calculateDateDifferenceInDays(date1: Date): number {
    const time1 = new Date(date1).getTime();
    const time2 = new Date().getTime();
  
    const differenceInMilliseconds = Math.abs(time1 - time2);
  
    const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
  
    return differenceInDays;
  }
  
}


