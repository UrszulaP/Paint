// DRAWING WHEN MOUSE DOWN, CHANGING THE BRUSH COLOR AND SIZE, CHANGING SIZE OF THE BRUSHSIZEBOX

const canvas = document.querySelector('#paper');
const ctx = canvas.getContext('2d');

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.strokeStyle;
ctx.lineWidth;

// BRUSH COLOR

// already declared in range_style.js:
// let hueRange = document.getElementById("hue_range");
// let saturationRange = document.getElementById("saturation_range");
// let lightnessRange = document.getElementById("lightness_range");

changeBrushColor(hueRange.value, saturationRange.value, lightnessRange.value);

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

changeBrushSize(brushSizeRange.value);
changeBrushSizeBoxSize(brushSizeRange.value);

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
