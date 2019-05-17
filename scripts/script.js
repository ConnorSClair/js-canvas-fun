var items_on_canvas = []
clicked = false
var imageLoader = document.getElementById('file-input');
    imageLoader.addEventListener('change', handleImage, false);

function textSubmission() {
    var text = document.getElementById('submission');
    var context = document.getElementById('canvas').getContext('2d');
    
    if (text) {
        context.fillText(text.value,100,100);
        var sticky_text = {
            text: text.value,
            xLoc: 100,
            yLoc: 100,
            clicked: false
        };
        items_on_canvas.push(sticky_text)    
    };
    
};

function handleImage(e) {
    // get open file uploader thing
    var context = document.getElementById('canvas').getContext('2d');

    var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();
        img.onload = function(){
            context.drawImage(img,0,0);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);  

            /*
    if (text) {
        context.fillText(text.value,100,100);
        var sticky_text = {
            text: text.value,
            xLoc: 100,
            yLoc: 100,
            clicked: false
        };
        items_on_canvas.push(sticky_text)    
    };
    debugger;
    */
};




function selected(e) {
    //var ctx = document.getElementById('canvas').getContext('2d');
    //ctx.fillStyle()
    //ctx.fillRect(0,0,1000,1000)
    var { offsetX, offsetY } = e;

    for (i = 0; i < items_on_canvas.length; i++) {
        var {xLoc, yLoc} = items_on_canvas[i] 
        if (Math.abs(xLoc - offsetX) < 50 && Math.abs(yLoc - offsetY) < 50) {
            items_on_canvas[i].clicked = true
        }   
    }
    

};

function moving(e) {
    clearCanvas();
    var { offsetX, offsetY } = e;
    var context = document.getElementById('canvas').getContext('2d');
    for (i = 0; i < items_on_canvas.length; i++) {
        debugger;
        var {text, clicked, xLoc, yLoc} = items_on_canvas[i];
        if (clicked) {
            xLoc = offsetX;
            yLoc = offsetY;
            items_on_canvas[i].xLoc = offsetX;
            items_on_canvas[i].yLoc = offsetY;
        };
        context.fillText(text,xLoc,yLoc);
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
    ctx.fillRect(0,0,1000,1000)
    ctx.fillStyle = 'black'
};
