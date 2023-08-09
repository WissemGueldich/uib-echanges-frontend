import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { Configuration } from '../models/configuration';

export type SortOrder = 'asc' | 'desc';
@Injectable()
@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: any[], sortOrder: SortOrder | string = 'asc', sortKey?: string): any {
    sortOrder = sortOrder && (sortOrder.toLowerCase() as any);    

    if (!value || (sortOrder !== 'asc' && sortOrder !== 'desc')) return value;

    let numberArray = [];
    let stringArray = [];
    let booleanArray = [];
    let objectArray = [];

    if (!sortKey) {
      numberArray = value.filter(item => typeof item === 'number').sort();
      stringArray = value.filter(item => typeof item === 'string').sort();
    } else {
      if (sortKey) {
        if(["filter","libelleConfig","sourceServer","destinationServer"].includes(sortKey)){
          switch (sortKey) {
            case 'libelleConfig':
              objectArray = value.sort((a, b) =>{
                if(a.configuration.libelle<b.configuration.libelle)return -1;
                else return 1;
              });
              break;
            case 'filter':
              objectArray = value.sort((a, b) =>{
                if(a.configuration.filter<b.configuration.filter)return -1;
                else return 1;
              });
              break;
            case 'sourceServer':
              objectArray = value.sort((a, b) =>{
                if(a.configuration.sourceServer.libelle<b.configuration.sourceServer.libelle)return -1;
                else return 1;
              });
              break;
            case 'destinationServer':
              objectArray = value.sort((a, b) =>{
                if(a.configuration.destinationServer.libelle<b.configuration.destinationServer.libelle)return -1;
                else return 1;
              });
              break;
            default:
              break;
          }
          
        }else{
          console.log("Not filter or libelleConfig");
          console.log(sortKey);
          
          numberArray = value.filter(item => typeof item[sortKey] === 'number').sort((a, b) => a[sortKey] - b[sortKey]);
          stringArray = value.filter(item => typeof item[sortKey] === 'string').sort((a, b) => {
              if (a[sortKey] < b[sortKey]) return -1;
              else if (a[sortKey] > b[sortKey]) return 1;
              else return 1;
          });
          booleanArray = value.filter(item => typeof item[sortKey] === 'boolean').sort((a, b) =>{
            if (a[sortKey] && !b[sortKey]) {
              return 1;
            }else if (!a[sortKey] && b[sortKey]) {
              return -1;
            } else {
              return 1;
            }
          });
        };
      }
    }
    const sorted = numberArray.concat(stringArray).concat(booleanArray).concat(objectArray);
    return sortOrder === 'asc' ? sorted : sorted.reverse();
  }

}
