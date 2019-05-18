var items_on_canvas = []

var imageLoader = document.getElementById('file-input');
imageLoader.addEventListener('change', handleImage, false);

const originX = 20
const originY = 20
const clickingRadius = 40

function textSubmission() {
    var text = document.getElementById('submission');
    var context = document.getElementById('canvas').getContext('2d');
    
    if (text) {
        context.fillText(text.value,originX,originY);
        var sticky_thing = {
            text: text.value,
            xLoc: originX,
            yLoc: originY,
            clicked: false,
            image: null
        };
        items_on_canvas.push(sticky_thing)    
    }; 
};

function handleImage(e) {
    // get open file uploader thing
    var context = document.getElementById('canvas').getContext('2d');
    var reader = new FileReader();
    reader.onload = function(event){
        img = new Image();
        img.onload = function(){
            context.drawImage(img,originX,originY);
        }
        img.src = event.target.result;
        var sticky_thing = {
            text: "an img",
            xLoc: originX,
            yLoc: originY,
            clicked: false,
            image: img
        };
        items_on_canvas.push(sticky_thing);
    }
    reader.readAsDataURL(e.target.files[0]);        
};

function selected(e) {
    var { offsetX, offsetY } = e;
    for (i = 0; i < items_on_canvas.length; i++) {
        var {xLoc, yLoc} = items_on_canvas[i];
        if (Math.abs(xLoc - offsetX) < clickingRadius && Math.abs(yLoc - offsetY) < clickingRadius) {
            items_on_canvas[i].clicked = true;
            break;
        }   
    }
};

function moving(e) {
    clearCanvas();
    var { offsetX, offsetY } = e;
    var context = document.getElementById('canvas').getContext('2d');
    for (i = 0; i < items_on_canvas.length; i++) {
        var {text, clicked, xLoc, yLoc, image} = items_on_canvas[i];
        if (clicked) {
            xLoc = offsetX;
            yLoc = offsetY;
            items_on_canvas[i].xLoc = offsetX;
            items_on_canvas[i].yLoc = offsetY;
        };
        if (image != null) {
            context.drawImage(img,xLoc,yLoc);
        } else {
            context.fillText(text,xLoc,yLoc);
        };
    };
};

function letGo(e) {
    for (i = 0; i < items_on_canvas.length; i++) {
            items_on_canvas[i].clicked = false
    };
};

function clearCanvas() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white'
    ctx.clearRect(0,0,1000,1000)
    ctx.fillStyle = 'black'
};
