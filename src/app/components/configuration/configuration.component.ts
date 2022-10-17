import { Component, OnInit } from '@angular/core';
import { Configuration } from 'src/app/models/configuration';
import { ConfigurationService } from 'src/app/services/configuration.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

configs: Configuration[] = [];
  filters = {
    keyword: '',
    sortBy: 'Name'
  }

  constructor(private _configService: ConfigurationService ) { }

  ngOnInit(): void {
    this.listConfigurations();
  }

  deleteConfiguration(id: number) {
    this._configService.deleteConfiguration(id).subscribe(
      data => {
        console.log('deleted response', data);
        this.listConfigurations();
      }
    )
  }

  listConfigurations() {
    this._configService.getConfigurations().subscribe(
      data => this.configs = data
    )
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

}
