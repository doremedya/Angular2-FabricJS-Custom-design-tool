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
var selectedImage;
function setFrontCanvas() {
  console.log(selectedImage)
  frontCanvas = new fabric.Canvas('front-canvas', {
    hoverCursor: 'pointer',
    selection: true,
    selectionBorderColor:'blue'
  });

  frontCanvas.setHeight(400);
  frontCanvas.setWidth(600);
  frontCanvas.loadFromJSON(canvasInfo.frontState[canvasInfo.frontState.length - 1]);
  frontCanvas.setBackgroundImage(selectedImage.horizontal.front, frontCanvas.renderAll.bind(frontCanvas), {
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
  backCanvas.setBackgroundImage(selectedImage.horizontal.back, backCanvas.renderAll.bind(backCanvas), {
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
  public checkedMatted: boolean = false;
  public checkedGloss: boolean = false;

  constructor(public spService: SingleProductService) {
    selectedImage = this.spService.getSelectedImage()
    
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
    setFrontCanvas();
    setBackCanvas();
    flipImages();
  }

}