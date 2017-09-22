import { Component, OnInit } from '@angular/core';
import { SingleProductService } from '../../services/single-product.service';


@Component({
  selector: 'shopping-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public frontImage: any;
  public backIamge: any;
  constructor() {
    this.frontImage = localStorage.getItem('front');
    this.backIamge = localStorage.getItem('back');

  }

  ngOnInit() {}

}
