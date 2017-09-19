import { Component, OnInit } from '@angular/core';

declare var $;
declare var fabric;

var canvas;
var state = [];
var mods = 0;

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
}

$(document).ready(function() {
	console.log($('#print-builder .col').height());	
	var originalCanvasWidth = canvas.width
	var originalCanvasHeight = canvas.height
	var layoutHorizontal = false
	$(".design-panel ul li.designs").click(function() {
		var bgImage = $(this).find('img').attr('src');
		canvas.setBackgroundImage(bgImage, canvas.renderAll.bind(canvas), {
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
		
	})

	$("#size-checkbox2").click(function() {
		if(layoutHorizontal) {
			canvas.setHeight(originalCanvasWidth * 0.6 * 0.5);
			canvas.setWidth(originalCanvasHeight * 0.6 * 0.5);
		} else {
			canvas.setHeight(originalCanvasHeight * 0.6);
			canvas.setWidth(originalCanvasWidth * 0.6);
		}
	})

	$("#size-checkbox3").click(function() {
		if(layoutHorizontal) {
			canvas.setHeight(originalCanvasWidth / 2);
			canvas.setWidth(originalCanvasHeight / 2 );
		} else {
			canvas.setHeight(originalCanvasHeight);
			canvas.setWidth(originalCanvasWidth);
		}
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

	constructor() {
		this.colorId = 'white';
	}

	ngOnInit() {
		initCanvas();
	}

}