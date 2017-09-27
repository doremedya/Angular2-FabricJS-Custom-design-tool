import { Component, OnInit } from '@angular/core';
import { SingleProductService } from '../../services/single-product.service';

declare var $;

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
    if(this.frontImage == null) {
      this.frontImage = localStorage.getItem('frontImage');
    }

    if(this.backIamge == null) {
      this.backIamge = localStorage.getItem('backImage');
    }

  }

  ngOnInit() {
    $('html, body').css('overflowY', 'auto');
  }

  order() {
    let handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_jHgqdqrXMWZQDn1MprK5Niq9',
      locale: 'auto',
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
      }
    });

    handler.open({
      name: 'Agent Cloud',
      description: 'postcard',
      amount: 2000
    });
  }
}
