import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SingleProductService } from '../../services/single-product.service';

@Component({
  selector: 'shopping-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
  public frontImage: any;
  public backIamge: any;

  constructor(private router: Router) {
    this.frontImage = localStorage.getItem('front');
    this.backIamge = localStorage.getItem('back');
    if(this.frontImage == null) {
      this.frontImage = localStorage.getItem('frontImage');
    }

    if(this.backIamge == null) {
      this.backIamge = localStorage.getItem('backImage');
    }

  }

  ngOnInit() {}

  order() {
    let that = this;
    let handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_jHgqdqrXMWZQDn1MprK5Niq9',
      locale: 'auto',
      token: function (token: any) {
        that.router.navigate(['/thank-you']);
      }
    });

    handler.open({
      name: 'Agent Cloud',
      description: 'postcard',
      amount: 2000
    });
  }
}
