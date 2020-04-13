// DRAWING WHEN MOUSE DOWN, CHANGING THE BRUSH COLOR AND SIZE, CHANGING SIZE OF THE BRUSHSIZEBOX, CHANGING PAPER SIZE, SAVING IMAGE

const canvas = document.querySelector('#paper');
const ctx = canvas.getContext('2d');


// PAPER SIZE

let sizeStep = 50;
let paperMinWidth = 200;
let paperMaxWidth =  2000;
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
    adjustPaperPosition();
}

function adjustPaperPosition() {
    if (canvas.width >= (document.getElementById("menu").clientWidth - sizeStep)) {
        canvas.parentElement.classList.remove("justify-content-center");
    };
    if (canvas.width < document.getElementById("menu").clientWidth) {
        canvas.parentElement.classList.add("justify-content-center");
    };
}

window.addEventListener("resize", adjustPaperPosition);

// CLEAR

document.getElementById("clear_paper").addEventListener("click", function() {setUpBrush()});


// SAVE

document.getElementById("save").addEventListener("click", save);

function save() {
    let image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    window.location.href = image;
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


// SETUP

function setUpBrush(width = canvas.width, height = canvas.height) {
    canvas.width = width;
    canvas.height = height;
    changeBrushColor(hueRange.value, saturationRange.value, lightnessRange.value);
    changeBrushSize(brushSizeRange.value);
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
}

setUpBrush(width = (0.7 * document.getElementById("menu").clientWidth), 
           height = (0.5 * document.getElementById("menu").clientWidth));

changeBrushSizeBoxSize(brushSizeRange.value);