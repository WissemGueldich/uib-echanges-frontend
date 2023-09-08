import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Report } from 'src/app/models/report';
import { ConfigurationService } from 'src/app/services/configuration.service';

@Component({
  selector: 'app-config-check-modal',
  templateUrl: './config-check-modal.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
      .dark-modal .modal-content {
        background-color: #292b2c;
        color: white;
      }
      .dark-modal .close {
        color: white;
      }
      .light-blue-backdrop {
        background-color: #5cb3fd;
      }
    `,
  ],
})
export class ConfigCheckModalComponent implements OnInit {
  @Input() libelle!: string;
  @Input() configId!: string;
  @Output() update = new EventEmitter();
  report: Report = new Report();
  isLoading:boolean = true;
  constructor( private modalService: NgbModal, private configurationService: ConfigurationService) { }

  ngOnInit(): void {}
  openVerticallyCentered(content: any) {
    this.isLoading=true;
    this.report== new Report();
    this.configurationService.checkConfiguration(+this.configId).subscribe((data) => {
      this.report=data;
      this.isLoading = false;
    });
    this.modalService.open(content, { centered: true });
  }
}
