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

var canvas_size = {
  large: {
    width: 600,
    height: 343
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
    height = canvas_size.small.height;
    width = canvas_size.small.width;
  } else if(sizePanel == "medium") {
    height = canvas_size.medium.height;
    width = canvas_size.medium.width;
  } else {
    height = canvas_size.large.height;
    width = canvas_size.large.width;    
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
    if(currentBuilder == 'front-builder') {
        var myjson = JSON.stringify(canvas);
        frontState.push(myjson);
        var frontDataURL = canvas.toDataURL({format: 'png', quality: 1.0});
        localStorage.setItem('front', frontDataURL);
    } else {
        var myjson = JSON.stringify(canvas);
        backState.push(myjson);
        var backDataURL = canvas.toDataURL({format: 'png', quality: 1.0});
        localStorage.setItem('back', backDataURL);
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

  updateModifications(true);  
}

// var imageDirection = "";
var imagelayoutPanel = "";

function setCanvas(imageObj, direction) {
  if(!imageObj)
    return;

  canvas.clear().renderAll();
  var imgUrl = imageObj[layoutPanel][direction];
  if(currentBuilder == 'front-builder') {
      selectedFrontImgObj = imageObj;
      frontImgDirection = direction;
  }else {
      selectedBackImgObj = imageObj;
      backImgDirection = direction;
  }

  setBackgroundImg(imgUrl);
  allPropertiesonCanvas(imageObj, direction);
  updateModifications(true);


  // if(images) {
  //   if(direction != "") {
  //     imageDirection = direction
  //     imagelayoutPanel = layoutPanel
  //     selectedImageObj = images
  //     // console.log(selectedImageObj)
  //     if(currentBuilder == 'front-builder') {
  //       // if(frontState.length > 0) 
  //       //   canvas.loadFromJSON(frontState[frontState.length - 1]);

  //       frontImage = images[layoutPanel][imageDirection];
  //       setBackgroundImg(frontImage)
  //       localStorage.setItem('frontImage', frontImage)
  //       allPropertiesonCanvas(selectImag)

  //       if(backImage){
  //         backImage = getOppositeImg(frontImage, backImage);
  //         localStorage.setItem('backImage', backImage)
  //       }

  //     } else {
  //       // if(backState.length > 0) 
  //       //   canvas.loadFromJSON(backState[backState.length - 1]);
  //       backImage = images[layoutPanel][imageDirection];
  //       setBackgroundImg(backImage)        
  //       localStorage.setItem('backImage', backImage)
  //       allPropertiesonCanvas(selectedImageObj)
  //       if(frontImage){
  //         frontImage = getOppositeImg(backImage, frontImage);
  //         localStorage.setItem('frontImage', frontImage)
  //       }
  //     }
  //   } else {
  //     if(imagelayoutPanel == layoutPanel) {
  //       if(currentBuilder == 'front-builder') {

  //         // if(frontState.length > 0) 
  //         //   canvas.loadFromJSON(frontState[frontState.length - 1]);

  //         setBackgroundImg(frontImage)
  //         localStorage.setItem('frontImage', frontImage)
  //         allPropertiesonCanvas(selectedImageObj)
  //         if(backImage){
  //           backImage = getOppositeImg(frontImage, backImage);
  //           localStorage.setItem('backImage', backImage)
  //         }

  //       } else {
  //         // if(backState.length > 0) 
  //         //   canvas.loadFromJSON(backState[backState.length - 1]);
  //       setBackgroundImg(backImage)        
  //       localStorage.setItem('backImage', backImage)
  //       allPropertiesonCanvas(selectedImageObj)
  //         if(frontImage){
  //           frontImage = getOppositeImg(backImage, frontImage);
  //           localStorage.setItem('frontImage', frontImage)
  //         }

  //       }
  //     }else {   
  //       imagelayoutPanel = layoutPanel
  //       var key = Object.keys(selectedImageObj.horizontal).filter(function(key) {return selectedImageObj.horizontal[key] == images })[0];
  //       var key1 = Object.keys(selectedImageObj.vertical).filter(function(key) {return selectedImageObj.vertical[key] == images })[0];

  //       if(key) {
  //         if(currentBuilder == 'front-builder') {
  //           // if(frontState.length > 0) 
  //           //   canvas.loadFromJSON(frontState[frontState.length - 1]);
  //           frontImage = selectedImageObj.vertical[key];
  //           setBackgroundImg(frontImage)
  //           localStorage.setItem('frontImage', frontImage)
  //           allPropertiesonCanvas(selectedImageObj)
  //             if(backImage){
  //               backImage = getOppositeImg(frontImage, backImage);
  //               localStorage.setItem('backImage', backImage)
  //             }
  //           } else {
  //             // if(backState.length > 0) 
  //             //   canvas.loadFromJSON(backState[backState.length - 1]);
  //             backImage = selectedImageObj.vertical[key];
  //             setBackgroundImg(backImage)              
  //             localStorage.setItem('backImage', backImage)
  //             allPropertiesonCanvas(selectedImageObj)

  //           if(frontImage){
  //             frontImage = getOppositeImg(backImage, frontImage);
  //             localStorage.setItem('frontImage', frontImage)
  //           }

  //         }
  //       } else if(key1) {
  //         if(currentBuilder == 'front-builder') {
  //           // if(frontState.length > 0) 
  //           //   canvas.loadFromJSON(frontState[frontState.length - 1]);
  //           frontImage = selectedImageObj.horizontal[key1];
  //           setBackgroundImg(frontImage)
  //           localStorage.setItem('frontImage', frontImage)
  //           allPropertiesonCanvas(selectedImageObj)
  //             if(backImage){
  //               backImage = getOppositeImg(frontImage, backImage);
  //               localStorage.setItem('backImage', backImage)
  //             }

  //           } else {
  //             // if(backState.length > 0) 
  //             //   canvas.loadFromJSON(backState[backState.length - 1]);
  //             backImage = selectedImageObj.horizontal[key1];
  //             setBackgroundImg(backImage)
              
  //             localStorage.setItem('backImage', backImage)

  //             if(frontImage){
  //               frontImage = getOppositeImg(backImage, frontImage);
  //               localStorage.setItem('frontImage', frontImage)
  //             }

  //         }
  //       }
  //     }
  //   }
  // }
  
}

function allPropertiesonCanvas(selectedImageObj, imageDirection) {
// console.log(imageDirection, layoutPanel, sizePanel);
  if(
    selectedImageObj.description && 
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].description &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].description.left &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].description.top &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].description.fontSize &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].description.fontColor 
  ){
    addDefaultText(selectedImageObj.description, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].description.left, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].description.top, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].description.fontSize, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].description.fontColor)
  }

  if(
    selectedImageObj.name && 
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].name &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].name.left &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].name.top &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].name.fontSize &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].name.fontColor 
  ){
    addDefaultText(selectedImageObj.name, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].name.left, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].name.top, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].name.fontSize, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].name.fontColor)
  }

  if(
    selectedImageObj.serial && 
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].serial &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].serial.left && 
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].serial.top && 
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].serial.fontSize && 
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].serial.fontColor
  ){
    addDefaultText(selectedImageObj.serial, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].serial.left, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].serial.top, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].serial.fontSize, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].serial.fontColor)
  }
  
  if(
    selectedImageObj.address1 && 
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].address1 &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].address1.left &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].address1.top &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].address1.fontSize &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].address1.fontColor
  ){
    addDefaultText(selectedImageObj.address1, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].address1.left, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].address1.top, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].address1.fontSize, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].address1.fontColor)
  }

  if(
    selectedImageObj.address2 && 
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].address2 &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].address2.left &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].address2.top &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].address2.fontSize &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].address2.fontColor
  ){
    addDefaultText(selectedImageObj.address2, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].address2.left, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].address2.top, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].address2.fontSize, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].address2.fontColor)
  }

  if(
    selectedImageObj.cellphone && 
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].cellphone &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].cellphone.left &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].cellphone.top &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].cellphone.fontSize &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].cellphone.fontColor 
  ){
    addDefaultText(selectedImageObj.cellphone, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].cellphone.left, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].cellphone.top, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].cellphone.fontSize, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].cellphone.fontColor)
  }

  if(
    selectedImageObj.telphone && 
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].telphone &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].telphone.left &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].telphone.top &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].telphone.fontSize &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].telphone.fontColor 
  ){
    addDefaultText(selectedImageObj.telphone, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].telphone.left, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].telphone.top, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].telphone.fontSize, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].telphone.fontColor)
  }
  
  if(
    selectedImageObj.email && 
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].email &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].email.left &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].email.top &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].email.fontSize &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].email.fontColor 
  ){
    addDefaultText(selectedImageObj.email, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].email.left, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].email.top, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].email.fontSize, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].email.fontColor)
  }

  if(
    selectedImageObj.website && 
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].website &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].website.left &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].website.top &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].website.fontSize &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].website.fontColor 
  ){
    addDefaultText(selectedImageObj.website, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].website.left, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].website.top, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].website.fontSize, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].website.fontColor)
  }
  
  if(
    selectedImageObj.logo && 
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].logo &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].logo.left &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].logo.top &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].logo.width &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].logo.height 
  ){
    setLogo(selectedImageObj.logo, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].logo.left, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].logo.top, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].logo.width, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].logo.height)
  }

  if(
    selectedImageObj.image1 && 
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image1 &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image1.left &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image1.top &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image1.width &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image1.height 
  ){
    setLogo(selectedImageObj.image1, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image1.left, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image1.top, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image1.width, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image1.height)
  }
  
  canvas.renderAll();
}

function getOppositeImg(img, oppositeImg) {

  var img_name = img.split('-').pop(-1);
  var mode = img_name.split('.')[0];
  var oppositeImg_nameAry = oppositeImg.split('-');
  var oppositeImg_name = oppositeImg_nameAry.pop(-1);
  var new_oppositeImg_name = oppositeImg_nameAry[0]+'-'+oppositeImg_nameAry[1]+'-'+mode+'.'+oppositeImg_name.split('.')[1];

  return new_oppositeImg_name;
}

function addDefaultText(value, left, top, fontSize, color) {
  
  var textSample = new fabric.IText(value, {
    left: left,
    top: top,
    fontSize: fontSize,
    angle: 0,
    fill: color,
    hasRotatingPoint: true
  });

  canvas.add(textSample);
  // updateModifications(true);
}

function setLogo(logo, left, top, width, height) {
  
  fabric.Image.fromURL(logo, function(img) {
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
      // var layoutHorizontal = true;
      // if(layoutPanel == 'horizontal') {
      //   layoutHorizontal = false;
      // }

      $("#addText").click(function() {
        var textSample = new fabric.IText('Sample Text', {
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

        if(currentBuilder == 'front-builder')
          setCanvas(selectedFrontImgObj, frontImgDirection);
        else
          setCanvas(selectedBackImgObj, backImgDirection);
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
        console.log(layoutPanel)
        console.log(sizePanel)
        if(layoutPanel == 'horizontal') {
          if(sizePanel == "small") {
            console.log("small")
            left = 20;
            top = 20;
            width = 100;
            height = 150;
          } else if (sizePanel == "medium") {
            console.log("medium")
            left = 30;
            top = 30;
            width = 160;
            height = 230;
          } else {
            console.log("large")
            left = 40;
            top = 40;
            width = 190;
            height = 250;
          }
        } else {
          if(sizePanel == "small") {
          //  console.log("small")
            left = 30;
            top = 30;
            width = 130;
            height = 190;
          } else if (sizePanel == "medium") {
          //  console.log("medium")
            left = 50;
            top = 50;
            width = 210;
            height = 240;
          } else {
          //  console.log("large")
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
      canvas.loadFromJSON(frontState[frontState.length - 1]);
    }else {
      canvas.loadFromJSON(backState[backState.length - 1]);
    }
    
    canvas.renderAll();
    
    // if(this.currentBuilder == 'front-builder' || changes.ipage.previousValue == 'back-builder') {
    //   this.currentBackState = backState;
    //   this.spService.setValue('backImage', this.backImage)
    //   this.spService.setValue('backState', this.currentBackState)
    //   state = []
      
    //   if(this.currentFrontState.length != 0) {          
    //     canvas.loadFromJSON(this.currentFrontState[this.currentFrontState.length - 1]);        
    //   } 

    //   if(this.currentBuilder == 'front-builder') {
    //     $(".btn-forward").prop('disabled', false);
    //     $(".btn-back").prop('disabled', true);
    //   } else {
    //     $(".btn-forward").prop('disabled', true);
    //     $(".btn-back").prop('disabled', false);
    //   }
    // //  setCanvas(this.frontImage)
    // } else {
    //   this.currentFrontState = frontState;
    //   this.spService.setValue('frontImage', this.frontImage)
    //   this.spService.setValue('frontState', this.currentFrontState)
    //   state = []
    //   if(this.currentBackState.length != 0) {         
    //     canvas.loadFromJSON(this.currentBackState[this.currentBackState.length - 1]);
        
    //   }
    // //  setCanvas(this.backImage)
    // }
    // canvas.renderAll();
  }

  setInitCanvas(imageObj, direction) {
    setCanvas(imageObj, direction);
    //this.spService.setselectedImageObj(value)
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

  updateCollapse(){
    this.isCollapse = !this.isCollapse;
    this.collapseUpdate.emit(this.isCollapse);
  }
}