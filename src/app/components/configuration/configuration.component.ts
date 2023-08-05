import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Configuration } from 'src/app/models/configuration';
import { SortPipe } from 'src/app/pipes/sort.pipe';
import { ConfigurationService } from 'src/app/services/configuration.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit, OnDestroy {

  configs: Configuration[] = [];
  filters = {
    keyword: '',
    sortBy: 'id',
    order: 'asc'
  }
  constructor(private _configService: ConfigurationService, private sortPipe: SortPipe ) { }

  ngOnInit(): void {
    this.listConfigurations();
  }
  subscribe : Subject<boolean> = new Subject();
  deleteConfiguration(id: number) {
    if (confirm('êtes vous sure de vouloir supprimer ?\n cette action est irreversible')) {
      this._configService.deleteConfiguration(id).pipe(takeUntil(this.subscribe)).subscribe(
        () => {
          this.listConfigurations();
        }
      )
    }
  }

  listConfigurations() {
    this._configService.getConfigurations().pipe(takeUntil(this.subscribe)).subscribe(
      data => {        
        this.configs = data
      }
    )
  }

  listener(){
    this.listConfigurations();
  }

  filterConfigurations(configs: Configuration[]) {
    // return Configurations.filter((e) => {
    //   return e.ConfigurationDate.toLowerCase().includes(this.filters.keyword.toLowerCase());
    // }).sort((a, b) => {
    //   if (this.filters.sortBy === 'date') {
    //     return a.ConfigurationDate.toLowerCase() > b.ConfigurationDate.toLowerCase() ? -1: 1;
    //   }else if(this.filters.sortBy === 'id') {
    //     return a.id > b.id ? -1: 1;
    //   }
    // })
  }
  ngOnDestroy() {    
    this.subscribe.next(true);
  }
  sort(sortBy: string){
    if (this.filters.sortBy==sortBy) {
      console.log("same");
      console.log(this.filters.order);

      this.filters.order=='desc'? this.filters.order='asc':this.filters.order='desc';
      console.log(this.filters.order);
      
    }else{
      console.log("not same");
      console.log(this.filters.order);

      this.filters.sortBy=sortBy;
      this.filters.order='desc'
      console.log(this.filters.order);

    }

  }

}
