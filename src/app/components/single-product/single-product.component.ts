import { Component, OnInit, Output } from '@angular/core';

declare var $;

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html'
})
export class SingleProductComponent implements OnInit {
  public ipage: string = '';
  public forwardFlag: boolean = true;
  constructor() {
    this.ipage = 'front-builder';
  }

  ngOnInit() {
    $('html, body').css('overflowY', 'hidden'); 
  }

  back() {
    this.forwardFlag = false
    if(this.ipage == 'review-order') {
      this.ipage = 'back-builder'
    } else if(this.ipage == 'back-builder') {
      this.ipage = 'front-builder'
    } else if (this.ipage == 'front-builder') {
      this.ipage = 'type-family'
      this.forwardFlag = true
    }
  }

  forward() {
    this.forwardFlag = true
    if(this.ipage == 'type-family') {
      this.ipage = 'front-builder'
    } else if(this.ipage == 'front-builder') {
      this.ipage = 'back-builder'
    } else if (this.ipage == 'back-builder') {
      this.ipage = 'review-order'
    }
  }

}
