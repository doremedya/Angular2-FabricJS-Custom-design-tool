import { Component, OnInit } from '@angular/core';
import { SingleProductService } from '../../../services/single-product.service';

declare var $;
declare var fabric;

var frontCanvas;
var backCanvas;
var canvasInfo;

function setFrontCanvas() {
  frontCanvas = new fabric.Canvas('front-canvas', {
    hoverCursor: 'pointer',
    selection: true,
    selectionBorderColor:'blue'
  });

  frontCanvas.setHeight(400);
  frontCanvas.setWidth(600);
  frontCanvas.loadFromJSON(canvasInfo.frontState[canvasInfo.frontState.length - 1]);
  frontCanvas.setBackgroundImage(canvasInfo.frontImage, frontCanvas.renderAll.bind(frontCanvas), {
    backgroundImageOpacity: 0.5,
    backgroundImageStrech: true,
    top: 0,
    left: 0,
    originX: 'left',
    originY: 'top',
    width: frontCanvas.width,
    height: frontCanvas.height,
  });
  frontCanvas.renderAll();
}

function setBackCanvas() {
  backCanvas = new fabric.Canvas('back-canvas', {
    hoverCursor: 'pointer',
    selection: true,
    selectionBorderColor:'blue'
  });

  backCanvas.setHeight(400);
  backCanvas.setWidth(600);
  backCanvas.loadFromJSON(canvasInfo.backState[canvasInfo.backState.length - 1]);
  backCanvas.setBackgroundImage(canvasInfo.backImage, backCanvas.renderAll.bind(backCanvas), {
    backgroundImageOpacity: 0.5,
    backgroundImageStrech: true,
    top: 0,
    left: 0,
    originX: 'left',
    originY: 'top',
    width: backCanvas.width,
    height: backCanvas.height,
  });
  backCanvas.renderAll();    
    
}

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
  console.log(value)
  if(value > 90) {
    $(".ui-back").css({
      'z-index': '1000',
      'opacity': '0',
      '-webkit-transform': "rotateY(" + (-180 - value) + "deg)",
      '-moz-transform': "rotateY(" + (-180 - value) + "deg)"
    })
  } else {
    $(".ui-back").css({
      'z-index': '1000',
      'opacity': '1',
      '-webkit-transform': "rotateY(" + (-180 - value) + "deg)",
      '-moz-transform': "rotateY(" + (-180 - value) + "deg)"
    })
  }  
}

$(document).ready(function() {
  $("#border-round").click(function() {
    console.log(123)
    // $(".canvas").css({
    //   'border-radius': '10'
    // })
  })

  $("#border-square").on('click', function() {
    console.log(123)
    // $(".canvas").css({
    //   'border-radius': '10'
    // })
  })

  $("#paper-original").click(function() {
    console.log(123)
  })

  $("#paper-super").click(function() {
    console.log(123)
  })

  $("#paper-luxe").click(function() {
    console.log(123)
  })

  $("#paper-cotton").click(function() {
    console.log(123)
  })

  $("#finish-matte").click(function() {
    console.log(123)
  })

  $("#finish-gloss").click(function() {
    console.log(123)
  })

})

@Component({
  selector: 'review-order',
  templateUrl: './review-order.component.html'
})

export class ReviewOrderComponent implements OnInit {

  public canvasInfo: any; 
  public borderStyle: string = 'square';
  public finishType: string = 'matte';
  public paperType: string = 'original';

  constructor(public spService: SingleProductService) {
    this.canvasInfo = this.spService.getValue();
    canvasInfo = this.spService.getValue();
  }

  ngOnInit() {
    setFrontCanvas();
    setBackCanvas();
    flipImages();
  }

}