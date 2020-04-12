// DRAWING WHEN MOUSE DOWN, CHANGING THE BRUSH COLOR AND SIZE, CHANGING SIZE OF THE BRUSHSIZEBOX, CHANGING PAPER SIZE

const canvas = document.querySelector('#paper');
const ctx = canvas.getContext('2d');



// PAPER SIZE

let sizeStep = 50;
let paperMinWidth = 200;
let paperMaxWidth =  document.getElementById("menu").clientWidth - sizeStep;
let paperMinHeight = 200;
let paperMaxHeight = paperMaxWidth;

document.getElementById("paper_width_minus").addEventListener("click", function() {changePaperSize(width=-sizeStep, height=0);
                                                                                   setUpBrush()});
document.getElementById("paper_width_plus").addEventListener("click", function() {changePaperSize(width=sizeStep, height=0);
                                                                                  setUpBrush()});
document.getElementById("paper_height_minus").addEventListener("click", function() {changePaperSize(width=0, height=-sizeStep);
                                                                                    setUpBrush()});
document.getElementById("paper_height_plus").addEventListener("click", function() {changePaperSize(width=0, height=sizeStep);
                                                                                   setUpBrush()});

function changePaperSize(width, height) {
    if (!((canvas.width <= paperMinWidth && width < 0) || (canvas.width >= paperMaxWidth && width > 0))) {
        canvas.width += width;
    };
    if (!((canvas.height <= paperMinHeight && height < 0) || (canvas.height >= paperMaxHeight && height > 0))) {
        canvas.height += height;
    };
}



// BRUSH COLOR

// already declared in range_style.js:
// let hueRange = document.getElementById("hue_range");
// let saturationRange = document.getElementById("saturation_range");
// let lightnessRange = document.getElementById("lightness_range");

hueRange.addEventListener("change", function() {changeBrushColor(hueRange.value, saturationRange.value, lightnessRange.value)});
saturationRange.addEventListener("change", function() {changeBrushColor(hueRange.value, saturationRange.value, lightnessRange.value)});
lightnessRange.addEventListener("change", function() {changeBrushColor(hueRange.value, saturationRange.value, lightnessRange.value)});

function changeBrushColor(hue, saturation, lightness) {
    ctx.strokeStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}



// BRUSH SIZE

// already declared in range_style.js:
//let brushSizeBox = document.getElementById("brush_size_box");
let brushSizeRange = document.getElementById("brush_size_range");

brushSizeRange.addEventListener("change", function() {changeBrushSize(brushSizeRange.value);
                                                      changeBrushSizeBoxSize(brushSizeRange.value);
                                                      });

function changeBrushSize(size) {
    ctx.lineWidth = size;
}

function changeBrushSizeBoxSize(size) {
    brushSizeBox.style.width = `${size}px`;
    brushSizeBox.style.height = `${size}px`;
}

changeBrushSizeBoxSize(brushSizeRange.value);



// DRAWING

let isDrawing = false;
let lastX = 0;
let lastY = 0;


function draw(e) {
    if (!isDrawing) return;
    drawLine(e);
}

function drawLine(e) {
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
}


canvas.addEventListener('mousemove', draw);

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);



// BRUSH SETUP

function setUpBrush() {
    changeBrushColor(hueRange.value, saturationRange.value, lightnessRange.value);
    changeBrushSize(brushSizeRange.value);
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
}

setUpBrush();