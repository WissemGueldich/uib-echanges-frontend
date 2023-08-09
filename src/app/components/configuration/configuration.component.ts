import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Configuration } from 'src/app/models/configuration';
import { ConfigurationService } from 'src/app/services/configuration.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit, OnDestroy {

  configs: Configuration[] = [];

  constructor(private _configService: ConfigurationService) { }

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

  ngOnDestroy() {    
    this.subscribe.next(true);
  }

  filters = {
    keyword: '',
    sortBy: 'id',
    order: 'desc'
  }
  
  sort(sortBy: string){
    if (this.filters.sortBy==sortBy) {
      this.filters.order=='desc'? this.filters.order='asc':this.filters.order='desc';
    }else{
      this.filters.sortBy=sortBy;
      this.filters.order='desc'
    }
  }

}
