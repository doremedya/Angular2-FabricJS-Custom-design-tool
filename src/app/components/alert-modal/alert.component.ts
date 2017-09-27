import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';

export interface ConfirmModel {
  title: string;
  message: string;
}

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
  title: string;
  message: string;
  layoutPanel: string = 'horizontal';
  sizePanel: string = 'small';
  constructor(private router: Router, dialogService: DialogService) {
    super(dialogService);
  }

  confirm() {
    this.result = true;
    this.close();  
    this.router.navigate(['/single-product']);  
  }
  cancel() {
    this.result = false;
    this.close();
  }
}