// Code from https://javascript30.com/

const canvas = document.querySelector('#paper');
const ctx = canvas.getContext('2d'); // we don`t draw directly on the canvas but on the context
// resize the canvas to fit the window
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

ctx.strokeStyle = "hsl(0, 100%, 50%)"; // color
ctx.lineJoin = 'round'; // end of line
ctx.lineCap = 'round'; // line connection
ctx.lineWidth = 1;
// ctx.globalCompositeOperation = "darken"; // effect when line overlaying

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let lineWidthChangeDirection = true; // flag of growing/lowering ctx.lineWidth


function draw(e) {
if (!isDrawing) return; // stop function when the mouse button is not clicked down
drawLine(e);
changeLineColor();
changeLineWidth();
}

function drawLine(e) {
ctx.beginPath();
ctx.moveTo(lastX, lastY);
ctx.lineTo(e.offsetX, e.offsetY);
ctx.stroke();
[lastX, lastY] = [e.offsetX, e.offsetY];
}

function changeLineColor() {
hue++;
if (hue >= 360) {
    hue = 0;
} // its changing back all the time so it`s not even necessary
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
}

function changeLineWidth() {
if (lineWidthChangeDirection) {
    ctx.lineWidth++;
} else {
    ctx.lineWidth--;
};
if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
    lineWidthChangeDirection = !lineWidthChangeDirection;
}
}


canvas.addEventListener('mousemove', draw);

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
    ctx.lineWidth = 1;
});

canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false); // prevents drawing when mouseup out of canvas element and moving back 
