// DRAWING WHEN MOUSE DOWN, CHANGING THE BRUSH COLOR AND SIZE, CHANGING SIZE OF THE BRUSHSIZEBOX, 
// CHANGING PAPER SIZE, CLEARNIG PAPER, SAVING IMAGE

// CONFIG

// config values
const config = {
  sizeStep: 50,
  paperMinWidth: 200,
  paperMaxWidth: 2000,
  paperMinHeight: 200,
  paperMaxHeight: 2000,
};

// config html elements
const paperWidthMinusEl = document.getElementById("paper_width_minus"),
  paperWidthPlusEl = document.getElementById("paper_width_plus"),
  paperHeightMinusEl = document.getElementById("paper_height_minus"),
  paperHeightPlusEl = document.getElementById("paper_height_plus"),
  menuEl = document.getElementById("menu"),
  clearPaperEl = document.getElementById("clear_paper"),
  saveEl = document.getElementById("save"),
  brushSizeRangeEl = document.getElementById("brush_size_range");

// config canvas
const canvas = document.querySelector('#paper');
const ctx = canvas.getContext('2d');


// PAPER SIZE

function changePaperSize(deltaWidth, deltaHeight) {
  const newWidth = canvas.width + deltaWidth,
    newHeight = canvas.height + deltaHeight;

  if (config.paperMinWidth <= newWidth && newWidth <= config.paperMaxWidth) {
    canvas.width = newWidth;
  }
  if (config.paperMinHeight <= newHeight && newHeight <= config.paperMaxHeight) {
    canvas.height = newHeight;
  }
  adjustPaperPosition();
}

function adjustPaperPosition() {
  if (canvas.width >= menuEl.clientWidth) {
    canvas.parentElement.classList.remove("justify-content-center");
  }
  if (canvas.width < menuEl.clientWidth) {
    canvas.parentElement.classList.add("justify-content-center");
  }
}

function setUpPaperSize() {
  paperWidthMinusEl.addEventListener("click", () => {
    changePaperSize(-config.sizeStep, 0);
    setUpCanvas()
  });
  paperWidthPlusEl.addEventListener("click", () => {
    changePaperSize(config.sizeStep, 0);
    setUpCanvas()
  });
  paperHeightMinusEl.addEventListener("click", () => {
    changePaperSize(0, -config.sizeStep);
    setUpCanvas()
  });
  paperHeightPlusEl.addEventListener("click", () => {
    changePaperSize(0, config.sizeStep);
    setUpCanvas()
  });
  window.addEventListener("resize", adjustPaperPosition);
}


// CLEAR

function setUpClear() {
  clearPaperEl.addEventListener("click", () => { setUpCanvas() });
}


// SAVE

function save() {
  let image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
  window.location.href = image;
}

function setUpSave() {
  saveEl.addEventListener("click", save);
}


// BRUSH COLOR

// already declared in range_style.js:
// const hueRangeEl = document.getElementById("hue_range"),
//      saturationRangeEl = document.getElementById("saturation_range"),
//      lightnessRangeEl = document.getElementById("lightness_range");

function changeBrushColor(hue, saturation, lightness) {
  ctx.strokeStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function setUpBrushColor() {
  hueRangeEl.addEventListener("change", () => {
    changeBrushColor(hueRangeEl.value, saturationRangeEl.value, lightnessRangeEl.value)
  });
  saturationRangeEl.addEventListener("change", () => {
    changeBrushColor(hueRangeEl.value, saturationRangeEl.value, lightnessRangeEl.value)
  });
  lightnessRangeEl.addEventListener("change", () => {
    changeBrushColor(hueRangeEl.value, saturationRangeEl.value, lightnessRangeEl.value)
  });
}


// BRUSH SIZE

// already declared in range_style.js:
// const brushSizeBoxEl = document.getElementById("brush_size_box");

function changeBrushSize(size) {
  ctx.lineWidth = size;
}

function changeBrushSizeBoxSize(size) {
  brushSizeBoxEl.style.width = `${size}px`;
  brushSizeBoxEl.style.height = `${size}px`;
}

function setUpBrushSize() {
  changeBrushSizeBoxSize(brushSizeRangeEl.value);

  brushSizeRangeEl.addEventListener("change", () => {
    changeBrushSize(brushSizeRangeEl.value);
    changeBrushSizeBoxSize(brushSizeRangeEl.value);
  });
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

function setUpDrawing() {
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
  });
  canvas.addEventListener('mouseup', () => isDrawing = false);
  canvas.addEventListener('mouseout', () => isDrawing = false);
}


// SETUP

function setUpCanvas(width = canvas.width, height = canvas.height) {
  canvas.width = width;
  canvas.height = height;
  changeBrushColor(hueRangeEl.value, saturationRangeEl.value, lightnessRangeEl.value);
  changeBrushSize(brushSizeRangeEl.value);
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
}

setUpPaperSize();
setUpClear();
setUpSave();
setUpBrushColor();
setUpBrushSize();
setUpDrawing();
setUpCanvas((0.7 * menuEl.clientWidth),
  (0.5 * menuEl.clientWidth));
