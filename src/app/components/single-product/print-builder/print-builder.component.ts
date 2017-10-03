import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { SingleProductService } from '../../../services/single-product.service';

declare var $;
declare var fabric;

var canvas;
var currentBuilder = 'front-builder';
var frontState = [];
var backState = [];
var front_mods = 0;
var back_mods = 0;
var frontImage = "";
var backImage = "";
var layoutPanel = "horizontal";
var sizePanel = "large";
var selectedFrontImgObj, selectedBackImgObj;
var frontImgDirection, backImgDirection;
var frontLayout, backLayout;

var canvas_size = {
  large: {
    width: 800,
    height: 444
  },
  medium: {
    width: 480,
    height: 274
  },
  small: {
    width: 320,
    height: 183
  }
}
function initCanvas() {
  var width, height;

  canvas = new fabric.Canvas('canvas', {
    hoverCursor: 'pointer',
    selection: true,
    selectionBorderColor:'blue'
  });

  if(sizePanel == "small") {
    width = canvas_size.small.width;
    height = canvas_size.small.height;
  } else if(sizePanel == "medium") {
    width = canvas_size.medium.width;
    height = canvas_size.medium.height;
  } else {
    width = canvas_size.large.width;    
    height = canvas_size.large.height;
  }
  
  if(layoutPanel == "horizontal") {
    canvas.setWidth(width);
    canvas.setHeight(height);
  } else {
    canvas.setWidth(height);
    canvas.setHeight(width);
  }

  canvas.on(
    'object:modified', function () {
    updateModifications(true);
  },
    'object:added', function () {
    updateModifications(true);
  });

  canvas.renderAll();    
}

function updateModifications(savehistory) {
  if (savehistory === true) {
    if(currentBuilder == 'front-builder') {
        var myjson = JSON.stringify(canvas);
        frontState.push(myjson);
        
        // Timer since setLogo function(Marek - 2017.10.03)
        setTimeout(function(){
          var frontDataURL = canvas.toDataURL({format: 'png', quality: 1.0});
          localStorage.setItem('front', frontDataURL);
        }, 500);        
    } else {
        var myjson = JSON.stringify(canvas);
        backState.push(myjson);

        // Timer since setLogo function(Marek - 2017.10.03)
        setTimeout(function(){        
          var backDataURL = canvas.toDataURL({format: 'png', quality: 1.0});
          localStorage.setItem('back', backDataURL);
        }, 500);        
    }
  }
}

function setBackgroundImg(image) {
  canvas.setBackgroundImage(image, canvas.renderAll.bind(canvas), {
    backgroundImageOpacity: 1,
    backgroundImageStrech: true,
    top: 0,
    left: 0,
    originX: 'left',
    originY: 'top',
    width: canvas.width,
    height: canvas.height,
  });
  canvas.renderAll();
  // updateModifications(true);  
}

function setCanvas(imageObj, direction) {
  if(!imageObj)
    return;

  canvas.clear().renderAll();
  var canvas_width = imageObj.size[layoutPanel][sizePanel].width;
  var canvas_height = imageObj.size[layoutPanel][sizePanel].height;
 
  canvas.setWidth(canvas_width);
  canvas.setHeight(canvas_height);

  canvas.renderAll();

  var imgUrl = imageObj.background[layoutPanel][direction];

  if(currentBuilder == 'front-builder') {
      selectedFrontImgObj = imageObj;
      frontImgDirection = direction;
  }else {
      selectedBackImgObj = imageObj;
      backImgDirection = direction;
  }

  setBackgroundImg(imgUrl);
  // allPropertiesonCanvas(imageObj, direction);
  // updateModifications(true);
  putDataOnCanvas(imageObj, direction);
}

function putDataOnCanvas(selectedImageObj, imageDirection) {
  selectedImageObj.elements.forEach(function(element){
      if(element.direction != imageDirection)
        return;

      if(element.type == 'image'){
          addDefaultImage(element.src, element.data[layoutPanel][sizePanel].left, element.data[layoutPanel][sizePanel].top, element.data[layoutPanel][sizePanel].width, element.data[layoutPanel][sizePanel].height);        
      }
  });


  // Add Text after load all images.
  setTimeout(function() {
      selectedImageObj.elements.forEach(function(element){
          if(element.direction != imageDirection)
            return;

          if(element.type == 'text'){
              addDefaultText(element.content, element.data[layoutPanel][sizePanel].left, element.data[layoutPanel][sizePanel].top, element.data[layoutPanel][sizePanel].fontSize, element.data[layoutPanel][sizePanel].fontColor, element.data[layoutPanel][sizePanel].fontFamily);
          }
      });
  }, 500);

  canvas.renderAll();
}

// function getOppositeImg(img, oppositeImg) {

//   var img_name = img.split('-').pop(-1);
//   var mode = img_name.split('.')[0];
//   var oppositeImg_nameAry = oppositeImg.split('-');
//   var oppositeImg_name = oppositeImg_nameAry.pop(-1);
//   var new_oppositeImg_name = oppositeImg_nameAry[0]+'-'+oppositeImg_nameAry[1]+'-'+mode+'.'+oppositeImg_name.split('.')[1];

//   return new_oppositeImg_name;
// }

function addDefaultText(content, left, top, fontSize, fontColor, fontFamily="Lato") {
  
  var textSample = new fabric.IText(content, {
    left: left,
    top: top,
    fontSize: fontSize,
    fontFamily: fontFamily,
    angle: 0,
    fill: fontColor,
    hasRotatingPoint: true,
    quality: 1
  });

  canvas.add(textSample);
}

function addDefaultImage(url, left, top, width, height) {
  
  fabric.Image.fromURL(url, function(img) {
    var oImg = img.set({
      left: left,
      top: top,
      width: width,
      height: height,
      quality: 1
    });

    canvas.add(oImg);
    updateModifications(true);
  });

}

@Component({
  selector: 'print-builder',
  templateUrl: './print-builder.component.html'
})

export class PrintBuilderComponent implements OnInit {  
  
  public colorId: string = '';
  public leftPanel: string = 'designs';
  public layoutPanel: string = 'horizontal';
  public sizePanel: string = 'large';
  public textAlign: string = 'center'
  public fontWeight: string = '';
  public currentBuilder: string = 'front-builder';
  public currentFrontState: any[] = [];
  public currentBackState: any[] = [];
  public frontImage: any;
  public backImage: any;
  public isCollapse: boolean = false;
  public product_designs: any;
  public label: string = "";

  @Input() ipage: string;
  @Output() collapseUpdate = new EventEmitter();

  constructor(public spService: SingleProductService) {
    this.colorId = 'white';
    this.currentBuilder = 'front-builder';
    this.product_designs = require("../../../../resources/data.json");
  }

  ngOnInit() {
    this.layoutPanel = this.spService.getLayout();
    this.sizePanel = this.spService.getSizePanel();
    
    layoutPanel = this.spService.getLayout();
    sizePanel = this.spService.getSizePanel();

    localStorage.clear();
    
    initCanvas();
    
    $(document).ready(function() {

      $("#addText").click(function() {
        var textSample = new fabric.IText('Sample Text', {
          left: fabric.util.getRandomInt(0, canvas.width / 2),
          top: fabric.util.getRandomInt(0, canvas.height / 2),
          fontFamily: 'ProximaNovaRegular',
          fontSize: 24,
          angle: 0,
          fill: '#000000',
          hasRotatingPoint:true
        });       
        canvas.add(textSample);
        updateModifications(true);
      });

      $("#undo").click(function() {
        if(currentBuilder == 'front-builder'){
          if (front_mods < frontState.length) {
            canvas.clear().renderAll();
            canvas.loadFromJSON(frontState[frontState.length - 1 - front_mods - 1]);
            canvas.renderAll();
            front_mods += 1;
          }          
        }else {
          if (back_mods < backState.length) {
            canvas.clear().renderAll();
            canvas.loadFromJSON(backState[backState.length - 1 - back_mods - 1]);
            canvas.renderAll();
            back_mods += 1;
          } 
        }
      })

      $("#redo").click(function() {
        if(currentBuilder == 'front-builder'){
          if (front_mods > 0) {
            canvas.clear().renderAll();
            canvas.loadFromJSON(frontState[frontState.length - 1 - front_mods + 1]);
            canvas.renderAll();
            front_mods -= 1;
          }
        }else {
          if (back_mods > 0) {
            canvas.clear().renderAll();
            canvas.loadFromJSON(backState[backState.length - 1 - back_mods + 1]);
            canvas.renderAll();
            back_mods -= 1;
          }
        }
      });

      $("#ui-fonts").change(function() {
        var activeObject = canvas.getActiveObject();
        var font = $(this).val();
        if (activeObject && activeObject.type === 'i-text') {
          activeObject.fontFamily = font;       
          canvas.renderAll();
          updateModifications(true);
        }
      });

      $("#ui-font-size").change(function() {
        var activeObject = canvas.getActiveObject();
        var fontSize = $(this).val();
        if (activeObject && activeObject.type === 'i-text') {
          activeObject.fontSize = (activeObject.fontSize == fontSize ? fontSize : fontSize);        
          canvas.renderAll();
          updateModifications(true);
        }
      });

      $("#ui-font-color ul li").click(function() {
        var color = $(".color-selector span").css('backgroundColor');
        var activeObject = canvas.getActiveObject();
        if (activeObject && activeObject.type === 'i-text') {
          activeObject.set({fill: color});
          canvas.renderAll();
          updateModifications(true);
        }
      });

      $("#bold").click(function(){
        var activeObject = canvas.getActiveObject();
        if (activeObject && activeObject.type === 'i-text') {
          activeObject.fontWeight = (activeObject.fontWeight == 'bold' ? '' : 'bold');        
          canvas.renderAll();
          updateModifications(true);
        }
      });

      $("#italic").click(function() {
        var activeObject = canvas.getActiveObject();
        if (activeObject && activeObject.type === 'i-text') {
          activeObject.fontStyle = (activeObject.fontStyle == 'italic' ? '' : 'italic');        
          canvas.renderAll();
          updateModifications(true);
        }
      })

      $("#align-left").click(function() {
        var activeObject = canvas.getActiveObject();
        if (activeObject && activeObject.type === 'i-text') {
          activeObject.textAlign = (activeObject.textAlign == 'left' ? '' : 'left');        
          canvas.renderAll();
          updateModifications(true);
        }
      })

      $("#align-center").click(function() {
        var activeObject = canvas.getActiveObject();
        if (activeObject && activeObject.type === 'i-text') {
          activeObject.textAlign = (activeObject.textAlign == 'center' ? '' : 'center');        
          canvas.renderAll();
          updateModifications(true);
        }
      })

      $("#align-right").click(function() {
        var activeObject = canvas.getActiveObject();
        if (activeObject && activeObject.type === 'i-text') {
          activeObject.textAlign = (activeObject.textAlign == 'right' ? '' : 'right');        
          canvas.renderAll();
          updateModifications(true);
        }
      })

      $(".layouts").click(function() {
        layoutPanel = $(this).attr('id');

        var canvasWidth = canvas.width;
        var canvasHeight = canvas.height;

        if(layoutPanel == 'horizontal'){
          canvas.setWidth(canvas_size[sizePanel].width);
          canvas.setHeight(canvas_size[sizePanel].height);
        }else {
          canvas.setWidth(canvas_size[sizePanel].height);
          canvas.setHeight(canvas_size[sizePanel].width);
        }

        if(currentBuilder == 'front-builder'){
          setCanvas(selectedFrontImgObj, frontImgDirection);
          frontLayout = layoutPanel;
        }else {
          setCanvas(selectedBackImgObj, backImgDirection);
          backLayout = layoutPanel;
        }
      })

      $(".sizes").click(function() {
        sizePanel = $(this).attr('id');

        if(layoutPanel == 'horizontal'){
          canvas.setWidth(canvas_size[sizePanel].width);
          canvas.setHeight(canvas_size[sizePanel].height);
        }else {
          canvas.setWidth(canvas_size[sizePanel].height);
          canvas.setHeight(canvas_size[sizePanel].width);
        }

        if(currentBuilder == 'front-builder')
          setCanvas(selectedFrontImgObj, frontImgDirection);
        else
          setCanvas(selectedBackImgObj, backImgDirection);
      })


      $("#myFile").on("change", function(e) { 
        var left = 30;
        var top = 30;  
        var width = 200;
        var height = 250;
        if(layoutPanel == 'horizontal') {
          if(sizePanel == "small") {
            left = 20;
            top = 20;
            width = 100;
            height = 150;
          } else if (sizePanel == "medium") {
            left = 30;
            top = 30;
            width = 160;
            height = 230;
          } else {
            left = 40;
            top = 40;
            width = 190;
            height = 250;
          }
        } else {
          if(sizePanel == "small") {
            left = 30;
            top = 30;
            width = 130;
            height = 190;
          } else if (sizePanel == "medium") {
            left = 50;
            top = 50;
            width = 210;
            height = 240;
          } else {
            left = 60;
            top = 60;
            width = 250;
            height = 320;
          }
          
        }
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onload = function (f) {
          var target: any = f.target;
          var data: string = target.result;
          fabric.Image.fromURL(data, function (img) {
            var oImg = img.set({
              left: left,
              top: top,
              angle: 0,
              width: width,
              height: height
            }).scale(0.9);
            canvas.add(oImg).renderAll();
            var a = canvas.setActiveObject(oImg);
            var dataURL = canvas.toDataURL({format: 'png', quality: 0.8});
            updateModifications(true);
          });
        };
        reader.readAsDataURL(file);
      })  

    })
  }

  ngOnChanges(changes) {
    if(changes.ipage.currentValue != this.currentBuilder) {
      this.changeBuilder(changes);      
    }       
  }

  changeBuilder(changes) {
    this.leftPanel = 'designs';
    canvas.clear().renderAll();
    this.currentBuilder = changes.ipage.currentValue;
    currentBuilder = changes.ipage.currentValue;

    this.frontImage = frontImage;
    this.backImage = backImage;

    if(this.currentBuilder == 'front-builder'){
      // if(frontLayout != backLayout){
      //   setCanvas(selectedFrontImgObj, frontImgDirection);
      // }else {
      //   canvas.loadFromJSON(frontState[frontState.length - 1]);
      // }
      // frontLayout = backLayout;
      setCanvas(selectedFrontImgObj, frontImgDirection);
    }else {
      // if(frontLayout != backLayout){
      //   setCanvas(selectedBackImgObj, backImgDirection);
      // }else {
      //   canvas.loadFromJSON(backState[backState.length - 1]);
      // }
      // backLayout = frontLayout;
      setCanvas(selectedBackImgObj, backImgDirection);
    }
    
    canvas.renderAll();
  }

  setInitCanvas(imageObj, direction) {
    setCanvas(imageObj, direction);
    //this.spService.setselectedImageObj(value)
  }

  saveLabel() {
    var textSample = new fabric.IText(this.label, {
      left: fabric.util.getRandomInt(0, canvas.width / 2),
      top: fabric.util.getRandomInt(0, canvas.height / 2),
      fontFamily: 'ProximaNovaRegular',
      fontSize: 24,
      angle: 0,
      fill: '#000000',
      hasRotatingPoint:true
    });       
    canvas.add(textSample);
    updateModifications(true);
  }

  updateCollapse(){
    this.isCollapse = !this.isCollapse;
    this.collapseUpdate.emit(this.isCollapse);
  }
}