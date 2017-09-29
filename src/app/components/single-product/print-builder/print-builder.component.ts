import { Component, OnInit, Input, Output, OnChanges } from '@angular/core';
import { SingleProductService } from '../../../services/single-product.service';

declare var $;
declare var fabric;

var canvas;
var state = [];
var mods = 0;
var originalImage = "";
var currentBuilder = 'front-builder';
var frontState = [];
var backState = [];
var frontImage = "";
var backImage = "";
var height = 400
var width = 600
var isCollapse = false
var layoutPanel = "horizontal";
var sizePanel = "large"
var selectImage;

function initCanvas() {
  canvas = new fabric.Canvas('canvas', {
    hoverCursor: 'pointer',
    selection: true,
    selectionBorderColor:'blue'
  });
  if(sizePanel == "small") {
    height = 240
    width = 320
  } else if(sizePanel == "medium") {
    height = 320
    width = 480
  }
  
  if(layoutPanel == "horizontal") {
    canvas.setHeight(height);
    canvas.setWidth(width);    
  } else {
    canvas.setHeight(width);
    canvas.setWidth(height);
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
    var myjson = JSON.stringify(canvas);
    state.push(myjson);
  }

  if(currentBuilder == 'front-builder') {
    frontState = state;
    var frontDataURL = canvas.toDataURL({format: 'png', quality: 1});
    localStorage.setItem('front', frontDataURL)
  } else {
    backState = state;
    var backDataURL = canvas.toDataURL({format: 'png', quality: 1});
    localStorage.setItem('back', backDataURL)
  }
}

function drawImage(image) {
  canvas.setBackgroundImage(image, canvas.renderAll.bind(canvas), {
    backgroundImageOpacity: 0.5,
    backgroundImageStrech: true,
    top: 0,
    left: 0,
    originX: 'left',
    originY: 'top',
    width: canvas.width,
    height: canvas.height,
  });

  canvas.renderAll();
}

var imageDirection = ""
var imagelayoutPanel = ""
function setCanvas(images, direction, layoutPanel) {
  if(direction != "") {
    imageDirection = direction
    imagelayoutPanel = layoutPanel
    selectImage = images
    console.log(selectImage)
    if(currentBuilder == 'front-builder') {
      if(frontState.length > 0) 
        canvas.loadFromJSON(frontState[frontState.length - 1]);
      frontImage = images[layoutPanel][imageDirection];
      drawImage(frontImage)
      localStorage.setItem('frontImage', frontImage)

    } else {
      if(backState.length > 0) 
        canvas.loadFromJSON(backState[backState.length - 1]);
      backImage = images[layoutPanel][imageDirection];
      drawImage(backImage)
      localStorage.setItem('backImage', backImage)
    }
  } else {
    if(imagelayoutPanel == layoutPanel) {
      if(currentBuilder == 'front-builder') {
        if(frontState.length > 0) 
          canvas.loadFromJSON(frontState[frontState.length - 1]);
        drawImage(frontImage)
        localStorage.setItem('frontImage', frontImage)

      } else {
        if(backState.length > 0) 
          canvas.loadFromJSON(backState[backState.length - 1]);
        drawImage(backImage)
        localStorage.setItem('backImage', backImage)
      }
    }else {
      imagelayoutPanel = layoutPanel
      console.log(selectImage)
      console.log(images)    
        var key = Object.keys(selectImage.horizontal).filter(function(key) {return selectImage.horizontal[key] == images })[0];
        var key1 = Object.keys(selectImage.vertical).filter(function(key) {return selectImage.vertical[key] == images })[0];
        console.log(key)
        console.log(key1)
      if(key) {
        if(currentBuilder == 'front-builder') {
          if(frontState.length > 0) 
            canvas.loadFromJSON(frontState[frontState.length - 1]);
          frontImage = selectImage.vertical[key];
          drawImage(frontImage)
          localStorage.setItem('frontImage', frontImage)

        } else {
          if(backState.length > 0) 
            canvas.loadFromJSON(backState[backState.length - 1]);
          backImage = selectImage.vertical[key];
          drawImage(backImage)
          localStorage.setItem('backImage', backImage)
        }
      } else if(key1) {
        if(currentBuilder == 'front-builder') {
          if(frontState.length > 0) 
            canvas.loadFromJSON(frontState[frontState.length - 1]);
          frontImage = selectImage.horizontal[key1];
          drawImage(frontImage)
          localStorage.setItem('frontImage', frontImage)

        } else {
          if(backState.length > 0) 
            canvas.loadFromJSON(backState[backState.length - 1]);
          backImage = selectImage.horizontal[key1];
          drawImage(backImage)
          localStorage.setItem('backImage', backImage)
        }
      }
    }
  }
  

  
}

function InitTextonCanvas(value, left, top, fontSize, color=null) {
  var textSample = new fabric.IText(value, {
    left: left,
    top: top,
    fontFamily: 'helvetica',
    fontSize: fontSize,
    angle: 0,
    fill: color ? color : '#000000',
    hasRotatingPoint: true
  });       
  canvas.add(textSample);
  updateModifications(true);
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
  public images: any;
  public label: string = "";

  @Input() ipage: string;

  constructor(public spService: SingleProductService) {
    this.colorId = 'white';
    this.currentBuilder = 'front-builder';
    this.images = require("../../../../resources/data.json");
  }

  ngOnInit() {
    this.layoutPanel = this.spService.getLayout();
    this.sizePanel = this.spService.getSizePanel();
    layoutPanel = this.spService.getLayout()
    sizePanel = this.spService.getSizePanel()
    localStorage.clear();
    initCanvas()
    $(document).ready(function() {
      var originalCanvasWidth = canvas.width
      var originalCanvasHeight = canvas.height
      var layoutHorizontal = true
      if(layoutPanel == 'horizontal') {
        layoutHorizontal = false
      }

      $("#addText").click(function() {
        var textSample = new fabric.IText('Sample Text', {
          left: fabric.util.getRandomInt(0, originalCanvasWidth / 2),
          top: fabric.util.getRandomInt(0, originalCanvasHeight / 2),
          fontFamily: 'helvetica',
          fontSize: 24,
          angle: 0,
          fill: '#000000',
          hasRotatingPoint:true
        });       
        canvas.add(textSample);
        updateModifications(true);
      });

      $("#undo").click(function() {
        if (mods < state.length) {
          canvas.clear().renderAll();
          canvas.loadFromJSON(state[state.length - 1 - mods - 1]);
          canvas.renderAll();
          mods += 1;
        }
      })

      $("#redo").click(function() {
        if (mods > 0) {
          canvas.clear().renderAll();
          canvas.loadFromJSON(state[state.length - 1 - mods + 1]);
          canvas.renderAll();
          //console.log("geladen " + (state.length-1-mods+1));
          mods -= 1;
          //console.log("state " + state.length);
          //console.log("mods " + mods);
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

      $("#layout-checkbox1").click(function() {
        var activeObject = canvas.getActiveObject();
        var canvasWidth = canvas.width
        var canvasHeight = canvas.height
        if(layoutHorizontal) {
          canvas.setHeight(canvasWidth);
          canvas.setWidth(canvasHeight);
          layoutHorizontal = false          
        } else {
          canvas.setHeight(canvasHeight);
          canvas.setWidth(canvasWidth);
        }
        layoutPanel = 'horizontal'
        canvas.clear()
        if(currentBuilder == 'front-builder')
          setCanvas(frontImage, "", layoutPanel)
        else 
          setCanvas(backImage, "", layoutPanel)
      })

      $("#layout-checkbox2").click(function() {
        var activeObject = canvas.getActiveObject();
        var canvasWidth = canvas.width
        var canvasHeight = canvas.height
        if(!layoutHorizontal) {          
          canvas.setHeight(canvasWidth);
          canvas.setWidth(canvasHeight);
          layoutHorizontal = true
        } else {
          canvas.setHeight(canvasHeight);
          canvas.setWidth(canvasWidth);
        }
        layoutPanel = 'vertical'
        canvas.clear()
        if(currentBuilder == 'front-builder')
          setCanvas(frontImage, "", layoutPanel)
        else 
          setCanvas(backImage, "", layoutPanel)
      })

      $("#size-checkbox1").click(function() {
        var height = 240
        var width = 320
        sizePanel = 'small'
        if(layoutHorizontal) {
          canvas.setHeight(width);
          canvas.setWidth(height);
        } else {
          canvas.setHeight(height);
          canvas.setWidth(width);
        }
        canvas.clear()
        if(currentBuilder == 'front-builder')
          setCanvas(frontImage, "", layoutPanel)
        else 
          setCanvas(backImage, "", layoutPanel)
        
      })

      $("#size-checkbox2").click(function() {
        var height = 320
        var width = 480
        sizePanel = 'medium'
        if(layoutHorizontal) {
          canvas.setHeight(width);
          canvas.setWidth(height);
        } else {
          canvas.setHeight(height);
          canvas.setWidth(width);
        }
        canvas.clear()
        if(currentBuilder == 'front-builder')
          setCanvas(frontImage, "", layoutPanel)
        else 
          setCanvas(backImage, "", layoutPanel)
      })

      $("#size-checkbox3").click(function() {
        sizePanel = 'large'
        if(layoutHorizontal) {
          canvas.setHeight(originalCanvasWidth);
          canvas.setWidth(originalCanvasHeight);
        } else {
          canvas.setHeight(originalCanvasHeight);
          canvas.setWidth(originalCanvasWidth);
        }
        canvas.clear()
        if(currentBuilder == 'front-builder')
          setCanvas(frontImage, "", layoutPanel)
        else 
          setCanvas(backImage, "", layoutPanel)
      })

      $("#myFile").on("change", function(e) { 
        var left = 50;
        var top = 50;  
        var width = 200;
        var height = 300;
        if(layoutPanel == 'horizontal') {
          if(sizePanel == "small") {

          } else if (sizePanel == "medium") {
            left = 55;
            top = 60;
            width = 310;
            height = 370;
          } else {
            left = 50;
            top = 50;
            width = 210;
            height = 320;
          }
        } else {
          if(sizePanel == "small") {

          } else if (sizePanel =="medium") {
            left = 55;
            top = 60;
            width = 220;
            height = 280;
          } else {
            left = 55;
            top = 60;
            width = 310;
            height = 370;
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

      $(".btn-collapse").click(function() {
        if(isCollapse)
          $(".back-forward").css("width", '100%')
        else {
          $(".back-forward").css("width", '66.5%')
        }
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
    canvas.clear();
    this.currentBuilder = changes.ipage.currentValue;
    currentBuilder = this.currentBuilder;
    this.frontImage = frontImage;
    this.backImage = backImage;
    if(this.currentBuilder == 'front-builder' || changes.ipage.previousValue == 'back-builder') {
      this.currentBackState = backState;
      this.spService.setValue('backImage', this.backImage)
      this.spService.setValue('backState', this.currentBackState)
      state = []
      
      if(this.currentFrontState.length != 0) {          
        canvas.loadFromJSON(this.currentFrontState[this.currentFrontState.length - 1]);        
      } 

      if(this.currentBuilder == 'front-builder') {
        $(".btn-forward").prop('disabled', false);
        $(".btn-back").prop('disabled', true);
      } else {
        $(".btn-forward").prop('disabled', true);
        $(".btn-back").prop('disabled', false);
      }
      setCanvas(this.frontImage, "", layoutPanel)
    } else {
      this.currentFrontState = frontState;
      this.spService.setValue('frontImage', this.frontImage)
      this.spService.setValue('frontState', this.currentFrontState)
      state = []
      if(this.currentBackState.length != 0) {         
        canvas.loadFromJSON(this.currentBackState[this.currentBackState.length - 1]);
        
      }
      setCanvas(this.backImage, "", layoutPanel)
    }
    canvas.renderAll();
  }

  setInitCanvas(images, direction, layoutPanel) {
    setCanvas(images, direction, layoutPanel)
    //this.spService.setSelectedImage(value)
  }

  saveLabel() {
    console.log(this.label)
    var textSample = new fabric.IText(this.label, {
      left: fabric.util.getRandomInt(0, canvas.width / 2),
      top: fabric.util.getRandomInt(0, canvas.height / 2),
      fontFamily: 'helvetica',
      fontSize: 24,
      angle: 0,
      fill: '#000000',
      hasRotatingPoint:true
    });       
    canvas.add(textSample);
    updateModifications(true);
  }

  OnCollapse() {
    this.isCollapse = !this.isCollapse;
    isCollapse = this.isCollapse
  }
}