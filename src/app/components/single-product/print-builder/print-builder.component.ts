import { Component, OnInit, Input, OnChanges } from '@angular/core';
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
function initCanvas() {
  canvas = new fabric.Canvas('canvas', {
    hoverCursor: 'pointer',
    selection: true,
    selectionBorderColor:'blue'
  });

  canvas.setHeight(height);
  canvas.setWidth(width);

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

$(document).ready(function() {
  var originalCanvasWidth = canvas.width
  var originalCanvasHeight = canvas.height
  var layoutHorizontal = false
  $(".design-panel ul li.designs").click(function() {
    $(".design-panel ul li").removeClass('active')
    $(this).addClass('active')
    var bgImage = $(this).find('img').attr('src');
    originalImage = bgImage;
    if(currentBuilder == 'front-builder') {
        frontImage = originalImage;
        localStorage.setItem('frontImage', frontImage)
      } else {
        backImage = originalImage;
        localStorage.setItem('backImage', backImage)
      }
    canvas.setBackgroundImage(bgImage, canvas.renderAll.bind(canvas), {
        backgroundImageOpacity: 0.5,
        backgroundImageStrech: true,
        top: 0,
        left: 0,
        originX: 'left',
        originY: 'top',
        width: canvas.width,
        height: canvas.height
    });
    canvas.renderAll();  
    
  })

  $("#addText").click(function() {
    var textSample = new fabric.IText('Sample Text', {
      left: fabric.util.getRandomInt(0, originalCanvasWidth / 2),
      top: fabric.util.getRandomInt(0, originalCanvasHeight / 2),
      fontFamily: 'helvetica',
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
      //console.log("geladen " + (state.length-1-mods-1));
      //console.log("state " + state.length);
      mods += 1;
        //console.log("mods " + mods);
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
      drawImage(originalImage)
    }
  })

  $("#layout-checkbox2").click(function() {
    var activeObject = canvas.getActiveObject();
    var canvasWidth = canvas.width
    var canvasHeight = canvas.height
    if(!layoutHorizontal) {
      canvas.setHeight(canvasWidth);
      canvas.setWidth(canvasHeight);
      layoutHorizontal = true
      drawImage(originalImage)
    }
  })

  $("#size-checkbox1").click(function() {
    var height = 240
    var width = 320
    if(layoutHorizontal) {
      canvas.setHeight(width);
      canvas.setWidth(height);
    } else {
      canvas.setHeight(height);
      canvas.setWidth(width);
    }
    
    drawImage(originalImage)
    
  })

  $("#size-checkbox2").click(function() {
    var height = 320
    if(layoutHorizontal) {
      canvas.setHeight(width);
      canvas.setWidth(height);
    } else {
      canvas.setHeight(height);
      canvas.setWidth(width);
    }
    drawImage(originalImage)
  })

  $("#size-checkbox3").click(function() {
    if(layoutHorizontal) {
      canvas.setHeight(originalCanvasWidth);
      canvas.setWidth(originalCanvasHeight);
    } else {
      canvas.setHeight(originalCanvasHeight);
      canvas.setWidth(originalCanvasWidth);
    }
    drawImage(originalImage)
  })

  $("#myFile").on("change", function(e) {   
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function (f) {
      let target: any = f.target;
      let data: string = target.result;

      fabric.Image.fromURL(data, function (img) {
        var oImg = img.set({
          left: 0,
          top: 0,
          angle: 0,
          width: 200,
          height: 200
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
  @Input() ipage: string;

  constructor(public spService: SingleProductService) {
    this.colorId = 'white';
  }

  ngOnInit() {
    localStorage.clear();
    initCanvas()
  }

  ngOnChanges(changes) {
    if(changes.ipage.currentValue != this.currentBuilder) {
      this.leftPanel = 'designs';
      canvas.clear();
      this.currentBuilder = changes.ipage.currentValue;
      currentBuilder = this.currentBuilder;
      if(this.currentBuilder == 'front-builder' || changes.ipage.previousValue == 'back-builder') {
        if(this.frontImage) {         
          drawImage(this.frontImage)
        }   
        this.backImage = backImage; 
        this.currentBackState = backState;
        this.spService.setValue('backImage', this.backImage)
        this.spService.setValue('backState', this.currentBackState)
        state = []
        
        if(this.currentFrontState.length != 0) {          
          canvas.loadFromJSON(this.currentFrontState[this.currentFrontState.length - 1]);
        }       
        
      } else {        
        if(this.backImage) {          
          drawImage(this.backImage)
        }
        this.frontImage = frontImage;
        this.currentFrontState = frontState;
        this.spService.setValue('frontImage', this.frontImage)
        this.spService.setValue('frontState', this.currentFrontState)
        state = []
        if(this.currentBackState.length != 0) {         
          canvas.loadFromJSON(this.currentBackState[this.currentBackState.length - 1]);
        }
      }
      canvas.renderAll();
    }       
  }
}