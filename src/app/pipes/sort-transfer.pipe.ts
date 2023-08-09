import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { SortOrder } from './sort.pipe';
import { Transfer } from '../models/transfer';
import { Configuration } from '../models/configuration';

@Injectable()
@Pipe({
  name: 'sortTransfer'
})
export class SortTransferPipe implements PipeTransform {

  transform(value: Transfer[], sortOrder: SortOrder | string = 'asc', sortKey?: string): any {
    sortOrder = sortOrder && (sortOrder.toLowerCase() as any);

    if (!value || (sortOrder !== 'asc' && sortOrder !== 'desc')) return value;

    if (sortKey) {
      if(sortKey in ["filter","libelle"]){
        value.sort((a, b) =>{
          if(a.configuration[sortKey as keyof typeof  a.configuration]<b.configuration[sortKey as keyof Configuration])return -1;
          else return 1;
        })
      };
    }
    const sorted = value;
    return sortOrder === 'asc' ? sorted : sorted.reverse();
  }

}
