const canvas = document.querySelector('#paper');
const ctx = canvas.getContext('2d');

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 10;


// BRUSH COLOR

// already declared in range_style.js:
// let hueRange = document.getElementById("hue_range");
// let saturationRange = document.getElementById("saturation_range");
// let lightnessRange = document.getElementById("lightness_range");

hueRange.addEventListener("change", function() {changeBrushColor(hueRange.value, saturationRange.value, lightnessRange.value)});
saturationRange.addEventListener("change", function() {changeBrushColor(hueRange.value, saturationRange.value, lightnessRange.value)});
lightnessRange.addEventListener("change", function() {changeBrushColor(hueRange.value, saturationRange.value, lightnessRange.value)});

changeBrushColor(hueRange.value, saturationRange.value, lightnessRange.value);

function changeBrushColor(hue, saturation, lightness) {
    ctx.strokeStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}


// BRUSH SIZE





// DRAWING

let isDrawing = false;
let lastX = 0;
let lastY = 0;


function draw(e) {
    if (!isDrawing) return; // stop function when the mouse button is not clicked down
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
canvas.addEventListener('mouseout', () => isDrawing = false); // prevents drawing when mouseup out of canvas element and moving back 
