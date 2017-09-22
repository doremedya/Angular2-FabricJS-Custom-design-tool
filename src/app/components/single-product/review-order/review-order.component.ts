import { Component, OnInit, OnChanges } from '@angular/core';
import { SingleProductService } from '../../../services/single-product.service';

declare var $;
declare var fabric;

var frontCanvas;
var backCanvas;
var canvasInfo;
var allImage = {
  front: "",
  back: ""
};

function flipImages() {
  $('.ui-ranger').rangeslider({
    polyfill: false,
    // Callback function
    onInit: function () {
      $(".ui-front").css({
        'z-index': '1000',
        '-webkit-transform': "rotateY(0deg)",
        '-moz-transform': "rotateY(0deg)"
      });

      $(".ui-back").css({
        'z-index': '-1',
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
  if(value < 90) {
    $(".ui-front").css({
      'z-index': '1000',
      '-webkit-transform': "rotateY(" + (-value) + "deg)",
      '-moz-transform': "rotateY(" + (-value) + "deg)"
    });
  } else {
    $(".ui-front").css({
      'z-index': '-1',
      '-webkit-transform': "rotateY(" + (-value) + "deg)",
      '-moz-transform': "rotateY(" + (-value) + "deg)"
    });
  }  
}

function swipeImgRight(value) {
  $(".ui-front").addClass("original");
  if(value > 90) {
    $(".ui-back").css({
      'z-index': '1000',
      '-webkit-transform': "rotateY(" + (180 - value) + "deg)",
      '-moz-transform': "rotateY(" + (180 - value) + "deg)"
    })
  } else {
    $(".ui-back").css({
      'z-index': '-1',
      '-webkit-transform': "rotateY(" + (180 - value) + "deg)",
      '-moz-transform': "rotateY(" + (180 - value) + "deg)"
    })
  }  
}



@Component({
  selector: 'review-order',
  templateUrl: './review-order.component.html'
})

export class ReviewOrderComponent implements OnInit {

  public canvasInfo: any; 
  public borderStyle: string = 'square';
  public finishType: string = '';
  public paperType: string = 'original';

  public frontImage: any;
  public backIamge: any;

  constructor(public spService: SingleProductService) {

    this.frontImage = localStorage.getItem('front');
    this.backIamge = localStorage.getItem('back');
    console.log(this.frontImage)
    if(this.frontImage == null) {
       this.frontImage = localStorage.getItem('frontImage');
    }

    if(this.backIamge == null) {
       this.backIamge = localStorage.getItem('backImage');
    }

    this.canvasInfo = this.spService.getValue();
    canvasInfo = this.spService.getValue();

    $(document).ready(function() {
      var checkedFinishType = true;
      var shineFlag = true;

      $("#border-round").click(function() {
        $(".canvas").css({
          borderRadius: 20
        })
      })

      $("#border-square").on('click', function() {
        $(".canvas").css({
          borderRadius: 0
        })
      })

      $("#paper-original").click(function() {
        $(".ui-front").removeClass("cotton");
        $(".ui-front").removeClass("super");
        $(".ui-front").removeClass("luxe");
        $(".ui-front").addClass("original");        
      })

      $("#paper-super").click(function() {
        $(".ui-front").removeClass("cotton");
        $(".ui-front").removeClass("luxe");
        $(".ui-front").removeClass("original");
        $(".ui-front").addClass("super");
      })

      $("#paper-luxe").click(function() {
        $(".ui-front").removeClass("cotton");
        $(".ui-front").removeClass("super");
        $(".ui-front").removeClass("original");
        $(".ui-front").addClass("luxe");
      })

      $("#paper-cotton").click(function() {
        $(".ui-front").removeClass("luxe");
        $(".ui-front").removeClass("super");
        $(".ui-front").removeClass("original");
        $(".ui-front").addClass("cotton");
      })

      $("#finish-matte").click(function() {
        console.log(checkedFinishType)
        if(checkedFinishType) {
          $("canvas").removeClass("stripped");
          $("canvas").addClass("dotted");
          checkedFinishType = false;
          shineFlag = true; 
        } else {
          $("canvas").removeClass("dotted");
          checkedFinishType = true;
        }
      })

      $("#finish-gloss").click(function() {
        if(shineFlag){
          $("canvas").addClass("stripped");
          $("canvas").removeClass("dotted");
          shineFlag = false;  
          checkedFinishType = true;
        } else {
          $("canvas").removeClass("stripped");
          shineFlag = true;  
        }        
      })

    })
  }

  ngOnInit() {
    flipImages();
  }

}