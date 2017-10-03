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
    width: 800,
    height: 480
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

  // updateModifications(true);  
}

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
    addDefaultText(
      selectedImageObj.name,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].name.left, 
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].name.top, 
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].name.fontSize, 
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].name.fontColor,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].name.fontFamily)
  }

  if(
    selectedImageObj.serial && 
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].serial &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].serial.left && 
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].serial.top && 
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].serial.fontSize && 
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].serial.fontColor
  ){
    addDefaultText(
      selectedImageObj.serial,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].serial.left,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].serial.top,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].serial.fontSize,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].serial.fontColor,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].serial.fontFamily)
  }
  
  if(
    selectedImageObj.address1 && 
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].address1 &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].address1.left &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].address1.top &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].address1.fontSize &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].address1.fontColor
  ){
    addDefaultText(selectedImageObj.address1, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].address1.left, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].address1.top, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].address1.fontSize, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].address1.fontColor, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].address1.fontFamily)
  }

  if(
    selectedImageObj.address2 && 
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].address2 &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].address2.left &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].address2.top &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].address2.fontSize &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].address2.fontColor
  ){
    addDefaultText(selectedImageObj.address2, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].address2.left, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].address2.top, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].address2.fontSize, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].address2.fontColor, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].address2.fontFamily)
  }

  if(
    selectedImageObj.cellphone && 
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].cellphone &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].cellphone.left &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].cellphone.top &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].cellphone.fontSize &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].cellphone.fontColor 
  ){
    addDefaultText(selectedImageObj.cellphone, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].cellphone.left, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].cellphone.top, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].cellphone.fontSize, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].cellphone.fontColor, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].cellphone.fontFamily)
  }

  if(
    selectedImageObj.telphone && 
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].telphone &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].telphone.left &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].telphone.top &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].telphone.fontSize &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].telphone.fontColor 
  ){
    addDefaultText(selectedImageObj.telphone, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].telphone.left, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].telphone.top, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].telphone.fontSize, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].telphone.fontColor, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].telphone.fontFamily)
  }
  
  if(
    selectedImageObj.email && 
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].email &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].email.left &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].email.top &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].email.fontSize &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].email.fontColor 
  ){
    addDefaultText(selectedImageObj.email, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].email.left, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].email.top, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].email.fontSize, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].email.fontColor, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].email.fontFamily)
  }

  if(
    selectedImageObj.website && 
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].website &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].website.left &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].website.top &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].website.fontSize &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].website.fontColor 
  ){
    addDefaultText(selectedImageObj.website, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].website.left, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].website.top, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].website.fontSize, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].website.fontColor, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].website.fontFamily)
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
    setLogo(selectedImageObj.image1, 
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image1.left, 
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image1.top, 
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image1.width, 
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image1.height)
  }
  
  if(
    selectedImageObj.title1Pre && 
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title1Pre &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title1Pre.left &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title1Pre.top &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title1Pre.fontSize &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title1Pre.fontColor &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title1Pre.fontFamily
  ){
    addDefaultText(selectedImageObj.title1Pre, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title1Pre.left, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title1Pre.top, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title1Pre.fontSize, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title1Pre.fontColor, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title1Pre.fontFamily)
  }

  if(
    selectedImageObj.title1After && 
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title1After &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title1After.left &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title1After.top &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title1After.fontSize &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title1After.fontColor
  ){
    addDefaultText(
      selectedImageObj.title1After, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title1After.left,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title1After.top,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title1After.fontSize,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title1After.fontColor,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title1After.fontFamily
    )
  }

  if(
    selectedImageObj.title2 && 
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title2 &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title2.left &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title2.top &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title2.fontSize &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title2.fontColor
  ){
    addDefaultText(
      selectedImageObj.title2, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title2.left,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title2.top,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title2.fontSize,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title2.fontColor,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title2.fontFamily
    )
  }

  if(
    selectedImageObj.price && 
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].price &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].price.left &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].price.top &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].price.fontSize &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].price.fontColor
  ){
    addTextonImage(
      selectedImageObj.mainImage, 
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].mainImage.left, 
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].mainImage.top, 
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].mainImage.width, 
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].mainImage.height,
      selectedImageObj.price,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].price.left,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].price.top,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].price.fontSize,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].price.fontColor,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].price.fontFamily,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].price.backgroundLeft,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].price.backgroundTop,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].price.backgroundWidth,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].price.backgroundHeight,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].price.bakcgroundColor)
  }

  if(
    selectedImageObj.image1Title && 
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image1Title &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image1Title.left &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image1Title.top &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image1Title.fontSize &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image1Title.fontColor
  ){

    addTextonImage(
      selectedImageObj.image2, 
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image2.left, 
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image2.top, 
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image2.width, 
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image2.height,
      selectedImageObj.image1Title,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image1Title.left,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image1Title.top,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image1Title.fontSize,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image1Title.fontColor,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image1Title.fontFamily,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image1Title.backgroundLeft,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image1Title.backgroundTop,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image1Title.backgroundWidth,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image1Title.backgroundHeight,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image1Title.bakcgroundColor)
  }

  if(
    selectedImageObj.image2Title && 
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image2Title &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image2Title.left &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image2Title.top &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image2Title.fontSize &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image2Title.fontColor
  ){

    addTextonImage(
      selectedImageObj.image3, 
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image3.left, 
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image3.top, 
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image3.width, 
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image3.height,
      selectedImageObj.image2Title,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image2Title.left,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image2Title.top,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image2Title.fontSize,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image2Title.fontColor,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image2Title.fontFamily,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image2Title.backgroundLeft,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image2Title.backgroundTop,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image2Title.backgroundWidth,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image2Title.backgroundHeight,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image2Title.bakcgroundColor)
  }

  if(
    selectedImageObj.image3Title && 
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image3Title &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image3Title.left &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image3Title.top &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image3Title.fontSize &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image3Title.fontColor
  ){

    addTextonImage(
      selectedImageObj.image4, 
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image4.left, 
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image4.top, 
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image4.width, 
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image4.height,
      selectedImageObj.image3Title,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image3Title.left,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image3Title.top,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image3Title.fontSize,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image3Title.fontColor,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image3Title.fontFamily,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image3Title.backgroundLeft,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image3Title.backgroundTop,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image3Title.backgroundWidth,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image3Title.backgroundHeight,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image3Title.bakcgroundColor)
  }


  if(
    selectedImageObj.image4 && 
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image4 &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image4.left &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image4.top &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image4.width &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image4.height 
  ){
    setLogo(selectedImageObj.image4, 
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image4.left, 
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image4.top, 
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image4.width, 
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].image4.height)
  }

  if(
    selectedImageObj.title3Pre && 
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title3Pre &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title3Pre.left &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title3Pre.top &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title3Pre.fontSize &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title3Pre.fontColor &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title3Pre.fontFamily
  ){
    addDefaultText(
      selectedImageObj.title3Pre, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title3Pre.left,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title3Pre.top,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title3Pre.fontSize,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title3Pre.fontColor,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title3Pre.fontFamily
    )
  }

  if(
    selectedImageObj.title3After && 
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title3After &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title3After.left &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title3After.top &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title3After.fontSize &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title3After.fontColor
  ){
    addDefaultText(
      selectedImageObj.title3After, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title3After.left,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title3After.top,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title3After.fontSize,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title3After.fontColor,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title3After.fontFamily
    )
  }

  if(
    selectedImageObj.content1 && 
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].content1 &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].content1.left &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].content1.top &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].content1.fontSize &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].content1.fontColor
  ){
    addDefaultText(
      selectedImageObj.content1, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].content1.left,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].content1.top,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].content1.fontSize,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].content1.fontColor,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].content1.fontFamily
    )
  }

  if(
    selectedImageObj.content2 && 
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].content2 &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].content2.left &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].content2.top &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].content2.fontSize &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].content2.fontColor
  ){
    addDefaultText(
      selectedImageObj.content2, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].content2.left,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].content2.top,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].content2.fontSize,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].content2.fontColor,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].content2.fontFamily
    )
  }

  if(
    selectedImageObj.content3 && 
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].content3 &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].content3.left &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].content3.top &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].content3.fontSize &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].content3.fontColor
  ){
    addDefaultText(
      selectedImageObj.content3, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].content3.left,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].content3.top,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].content3.fontSize,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].content3.fontColor,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].content3.fontFamily
    )
  }

  if(
    selectedImageObj.content4 && 
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].content4 &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].content4.left &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].content4.top &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].content4.fontSize &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].content4.fontColor
  ){
    addDefaultText(
      selectedImageObj.content4, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].content4.left,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].content4.top,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].content4.fontSize,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].content4.fontColor,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].content4.fontFamily
    )
  }

  if(
    selectedImageObj.content5 && 
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].content5 &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].content5.left &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].content5.top &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].content5.fontSize &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].content5.fontColor
  ){
    addDefaultText(
      selectedImageObj.content5, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].content5.left,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].content5.top,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].content5.fontSize,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].content5.fontColor,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].content5.fontFamily
    )
  }

  if(
    selectedImageObj.content6 && 
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].content6 &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].content6.left &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].content6.top &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].content6.fontSize &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].content6.fontColor
  ){
    addDefaultText(
      selectedImageObj.content6, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].content6.left,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].content6.top,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].content6.fontSize,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].content6.fontColor,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].content6.fontFamily
    )
  }

  if(
    selectedImageObj.description1 && 
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].description1 &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].description1.left &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].description1.top &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].description1.fontSize &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].description1.fontColor
  ){
    addDefaultText(
      selectedImageObj.description1, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].description1.left,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].description1.top,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].description1.fontSize,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].description1.fontColor,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].description1.fontFamily
    )
  }

  if(
    selectedImageObj.title4Pre && 
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title4Pre &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title4Pre.left &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title4Pre.top &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title4Pre.fontSize &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title4Pre.fontColor &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title4Pre.fontFamily
  ){
    addDefaultText(
      selectedImageObj.title4Pre, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title4Pre.left,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title4Pre.top,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title4Pre.fontSize,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title4Pre.fontColor,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title4Pre.fontFamily
    )
  }

  if(
    selectedImageObj.title4After && 
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title4After &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title4After.left &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title4After.top &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title4After.fontSize &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title4After.fontColor
  ){
    addDefaultText(
      selectedImageObj.title4After, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title4After.left,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title4After.top,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title4After.fontSize,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title4After.fontColor,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].title4After.fontFamily
    )
  }

  if(
    selectedImageObj.contactDescription && 
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].contactDescription &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].contactDescription.left &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].contactDescription.top &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].contactDescription.fontSize &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].contactDescription.fontColor
  ){
    addDefaultText(
      selectedImageObj.contactDescription, selectedImageObj.position[imageDirection][layoutPanel][sizePanel].contactDescription.left,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].contactDescription.top,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].contactDescription.fontSize,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].contactDescription.fontColor,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].contactDescription.fontFamily
    )
  }

  if(
    selectedImageObj.about && 
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].about &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].about.left &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].about.top &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].about.fontSize &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].about.fontColor
  ){
    addDefaultText(
      selectedImageObj.about,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].about.left,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].about.top,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].about.fontSize,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].about.fontColor,
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].about.fontFamily
    )
  }

  if(
    selectedImageObj.user && 
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].user &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].user.left &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].user.top &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].user.width &&
    selectedImageObj.position[imageDirection][layoutPanel][sizePanel].user.height 
  ){
    setLogo(selectedImageObj.user, 
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].user.left, 
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].user.top, 
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].user.width, 
      selectedImageObj.position[imageDirection][layoutPanel][sizePanel].user.height)
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

function addDefaultText(value, left, top, fontSize, color, fontFamily="ProximaNovaRegular") {
  
  var textSample = new fabric.IText(value, {
    left: left,
    top: top,
    fontSize: fontSize,
    fontFamily: fontFamily,
    angle: 0,
    fill: color,
    hasRotatingPoint: true
  });

  canvas.add(textSample);
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

function addTextonImage(logo, ImageLeft, ImageTop, ImageWidth, ImageHeight, value, TextLeft, TextTop, TextFontSize, TextColor, TextFontFamily, backgroundLeft, backgroundTop, backgroundWidth, backgroundHeight, backgroundColor, fontWeight="normal") {
  setLogo(logo, ImageLeft, ImageTop, ImageWidth, ImageHeight)

  setTimeout(function() {    
    canvas.add(
      new fabric.Rect({ 
        top: backgroundTop, 
        left: backgroundLeft, 
        width: backgroundWidth, 
        height: backgroundHeight, 
        fill: backgroundColor 
      })
    );
    addDefaultText(value, TextLeft, TextTop, TextFontSize, TextColor, TextFontFamily)
  }, 500)
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