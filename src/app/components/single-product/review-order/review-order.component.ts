import { Component, OnInit, OnChanges } from '@angular/core';
import { SingleProductService } from '../../../services/single-product.service';

declare var $;
declare var fabric;

var frontCanvas;
var backCanvas;
var allImage = {
  front: "",
  back: ""
};
var canvas_size = {
  width: 600,
  height: 343
}
function setFrontCanvas() {
  frontCanvas = new fabric.Canvas('front-canvas', {
    hoverCursor: 'pointer',
    selection: true,
    selectionBorderColor:'blue'
  });

  frontCanvas.setWidth(canvas_size.width);
  frontCanvas.setHeight(canvas_size.height);

  var front_image = localStorage.getItem('front');

  if(!front_image)
    return;

  frontCanvas.setBackgroundImage(front_image, frontCanvas.renderAll.bind(frontCanvas), {
    backgroundImageOpacity: 1,
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

  backCanvas.setWidth(canvas_size.width);
  backCanvas.setHeight(canvas_size.height);

  var back_image = localStorage.getItem('back');

  if(!back_image)
    return;

  backCanvas.setBackgroundImage(back_image, backCanvas.renderAll.bind(backCanvas), {
    backgroundImageOpacity: 1,
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

  public borderStyle: string = 'square';
  public finishType: string = '';
  public paperType: string = 'original';
  public checkedMatted: boolean = false;
  public checkedGloss: boolean = false;

  constructor(public spService: SingleProductService) {

    $(document).ready(function() {
      var checkedFinishType = true;
      var shineFlag = true;

      $("#border-round").click(function() {
        $(".ui-rotator .canvas").css({
          borderRadius: 20
        })
      })

      $("#border-square").on('click', function() {
        $(".ui-rotator .canvas").css({
          borderRadius: 0
        })
      })

      $("#finish-matte").click(function() {
        // console.log(checkedFinishType)
        // if(checkedFinishType) {
        //   $("canvas").removeClass("stripped");
        //   $("canvas").addClass("dotted");
        //   checkedFinishType = false;
        //   shineFlag = true; 
        // } else {
        //   $("canvas").removeClass("dotted");
        //   checkedFinishType = true;
        // }
      })

      $("#finish-gloss").click(function() {
        
        if(shineFlag){
          fabric.Image.fromURL('../../../../assets/images/glossy.png', function(img) {
            var oImg = img.set({
              left: 0,
              top: 0,
              width: frontCanvas.width,
              height: frontCanvas.height,
              quality: 1
            });

            frontCanvas.add(oImg);
            frontCanvas.renderAll();

            backCanvas.add(oImg);
            backCanvas.renderAll();          
          });
         
          shineFlag = false;  
          checkedFinishType = true;
        } else {
          frontCanvas.clear().renderAll();
          backCanvas.clear().renderAll();

          setFrontCanvas();
          setBackCanvas();
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