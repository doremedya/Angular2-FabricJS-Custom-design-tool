import { Component, OnInit, Input, OnChanges } from '@angular/core';

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
function initCanvas() {
	canvas = new fabric.Canvas('canvas', {
		hoverCursor: 'pointer',
		selection: true,
		selectionBorderColor:'blue'
	});

    canvas.setHeight($('#print-builder .col').height());
    canvas.setWidth($('#print-builder .col').width() - 100);

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
    console.log(currentBuilder)
    if(currentBuilder == 'front-builder') {
    	frontState = state;
    } else {
    	backState = state;
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
		var bgImage = $(this).find('img').attr('src');
		originalImage = bgImage;
		if(currentBuilder == 'front-builder') {
	    	frontImage = originalImage;
	    } else {
	    	backImage = originalImage;
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
			left: fabric.util.getRandomInt(0, $('#print-builder .col').width() / 2),
			top: fabric.util.getRandomInt(0, $('#print-builder .col').height() / 2),
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
		if(!layoutHorizontal) {
			layoutHorizontal = true
			if(canvasWidth < canvasHeight) {			
				canvas.setHeight(canvasWidth / 2);
		     	canvas.setWidth(canvasHeight / 2);
			} else {
				canvas.setHeight(canvasWidth);
		     	canvas.setWidth(canvasHeight);
			}
		}
		drawImage(originalImage)
		
	})

	$("#layout-checkbox2").click(function() {
		var activeObject = canvas.getActiveObject();
		var canvasWidth = canvas.width
		var canvasHeight = canvas.height
		if(originalCanvasWidth == canvasWidth) {
			canvas.setHeight(canvasHeight);
     		canvas.setWidth(canvasWidth);
		} else {
			canvas.setHeight(canvasWidth * 2);
     		canvas.setWidth(canvasHeight * 2);
		}
		layoutHorizontal = false
		drawImage(originalImage)
		// canvas.setHeight(originalCanvasHeight);
  //    	canvas.setWidth(originalCanvasWidth);
	})

	$("#size-checkbox1").click(function() {
		if(layoutHorizontal) {
			canvas.setHeight(originalCanvasWidth * 0.3 * 0.5);
			canvas.setWidth(originalCanvasHeight * 0.3 * 0.5);
		} else {
			canvas.setHeight(originalCanvasHeight * 0.3);
			canvas.setWidth(originalCanvasWidth * 0.3);
		}
		drawImage(originalImage)
		
	})

	$("#size-checkbox2").click(function() {
		if(layoutHorizontal) {
			canvas.setHeight(originalCanvasWidth * 0.6 * 0.5);
			canvas.setWidth(originalCanvasHeight * 0.6 * 0.5);
		} else {
			canvas.setHeight(originalCanvasHeight * 0.6);
			canvas.setWidth(originalCanvasWidth * 0.6);
		}
		drawImage(originalImage)
	})

	$("#size-checkbox3").click(function() {
		if(layoutHorizontal) {
			canvas.setHeight(originalCanvasWidth / 2);
			canvas.setWidth(originalCanvasHeight / 2 );
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

			canvas.setBackgroundImage(data, canvas.renderAll.bind(canvas), {
			    backgroundImageOpacity: 0.5,
			   	backgroundImageStrech: true,
			   	top: 0,
	            left: 0,
	            originX: 'left',
	            originY: 'top',
	            width: canvas.width,
	   			height: canvas.height,
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
	public layoutPanel: string = 'vertical';
	public sizePanel: string = 'large';
	public textAlign: string = 'center'
	public fontWeight: string = '';
	public currentBuilder: string = 'front-builder';
	public currentFrontState: any[] = [];
	public currentBackState: any[] = [];
	public frontImage: any;
	public backImage: any;
	@Input() ipage: string;

	constructor() {
		this.colorId = 'white';
	}

	ngOnInit() {
		initCanvas()
	}

	ngOnChanges(changes) {
		if(changes.ipage.currentValue != this.currentBuilder) {
			canvas.clear();
			this.currentBuilder = changes.ipage.currentValue;
			currentBuilder = this.currentBuilder;
			if(this.currentBuilder == 'front-builder') {			
				if(this.frontImage)	{
					drawImage(this.frontImage)
				}		
				this.backImage = backImage;	
				this.currentBackState = backState;
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
				state = []
				if(this.currentBackState.length != 0) {
					canvas.loadFromJSON(this.currentBackState[this.currentBackState.length - 1]);
				}
			}
			canvas.renderAll();
		}      	
  	}
}