import { Component, OnInit } from '@angular/core';

declare var $;

function flipImages() {
  $('.ui-ranger').rangeslider({
    polyfill: false,
    // Callback function
    onInit: function () {
      $(".ui-front").css({
        'z-index': '900',
        '-webkit-transform': "rotateY(0deg)",
        '-moz-transform': "rotateY(0deg)"
      });

      $(".ui-back").css({
        'z-index': '800',
        '-webkit-transform': "rotateY(-180deg)",
        '-moz-transform': "rotateY(-180deg)"
      })
    },
    onSlide: function (position, value) {
      swipeImgLeft(value);
      swipeImgRight(value);
    }
  });
}

function swipeImgLeft(value) {
  $(".ui-front").css({
    'z-index': '900',
    '-webkit-transform': "rotateY(" + -value + "deg)",
    '-moz-transform': "rotateY(" + value + "deg)"
  });
}

function swipeImgRight(value) {
  $(".ui-back").css({
    'z-index': '1000',
    '-webkit-transform': "rotateY(" + (-180 - value) + "deg)",
    '-moz-transform': "rotateY(" + (-180 - value) + "deg)"
  })
}


@Component({
  selector: 'review-order',
  templateUrl: './review-order.component.html'
})
export class ReviewOrderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    flipImages();
  }

}