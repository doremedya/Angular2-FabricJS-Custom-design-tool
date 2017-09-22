import { Component, OnInit } from '@angular/core';
import { SingleProductService } from '../../services/single-product.service';


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

  frontCanvas.setHeight(110);
  frontCanvas.setWidth(200);
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

  backCanvas.setHeight(110);
  backCanvas.setWidth(200);
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

@Component({
  selector: 'shopping-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor() {
    canvasInfo = JSON.parse(localStorage.getItem('image'))
    console.log(canvasInfo)
  }

  ngOnInit() {
    setFrontCanvas()
    setBackCanvas()
  }

}
