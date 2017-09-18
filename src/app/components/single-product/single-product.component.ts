import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html'
})
export class SingleProductComponent implements OnInit {
  private ipage: string = '';

  constructor() {
    this.ipage = 'front-builder';
  }

  ngOnInit() {

  }

}
