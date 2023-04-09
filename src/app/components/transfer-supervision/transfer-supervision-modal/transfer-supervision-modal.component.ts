import {
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SystemUser } from 'src/app/models/systemUser';
import { TransferSupervisionService } from 'src/app/services/transfer-supervision.service';


@Component({
  selector: 'trs-modal',
  templateUrl: './transfer-supervision-modal.component.html',
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
export class TransferSupervisionModalComponent {
  closeResult!: string;
  @Output() update = new EventEmitter();
  systemUser: SystemUser = new SystemUser();
  constructor(
    private modalService: NgbModal,
    private _transferSupervisionService: TransferSupervisionService,
  ) {}

  deleteTransfersForm = new FormGroup({
    from: new FormControl( null, [ Validators.required]),
    to: new FormControl(null, [ Validators.required]),
  });

  onSubmit() {
    if (this.deleteTransfersForm.valid ) {
        this._transferSupervisionService
          .deleteTransfersBetween(this.deleteTransfersForm.value.from!,this.deleteTransfersForm.value.to!)
          .subscribe((data) => {
            this.update.emit();
          });
      this.deleteTransfersForm.reset();
    }
  }

  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true });
  }
}
