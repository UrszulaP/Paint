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
const paperWidthMinusBtn = document.getElementById("paper-width-minus"),
  paperWidthPlusBtn = document.getElementById("paper-width-plus"),
  paperHeightMinusBtn = document.getElementById("paper-height-minus"),
  paperHeightPlusBtn = document.getElementById("paper-height-plus"),
  menuEl = document.getElementById("menu"),
  clearPaperBtn = document.getElementById("clear-paper"),
  saveBtn = document.getElementById("save"),
  brushSizeRangeEl = document.getElementById("brush-size-range");

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
  paperWidthMinusBtn.addEventListener("click", () => {
    changePaperSize(-config.sizeStep, 0);
    setUpCanvas()
  });
  paperWidthPlusBtn.addEventListener("click", () => {
    changePaperSize(config.sizeStep, 0);
    setUpCanvas()
  });
  paperHeightMinusBtn.addEventListener("click", () => {
    changePaperSize(0, -config.sizeStep);
    setUpCanvas()
  });
  paperHeightPlusBtn.addEventListener("click", () => {
    changePaperSize(0, config.sizeStep);
    setUpCanvas()
  });
  window.addEventListener("resize", adjustPaperPosition);
}


// CLEAR

function setUpClear() {
  clearPaperBtn.addEventListener("click", () => setUpCanvas() );
}


// SAVE

function save() {
  let image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
  window.location.href = image;
}

function setUpSave() {
  saveBtn.addEventListener("click", save);
}


// BRUSH COLOR

// already declared in range_style.js:
// const hueRangeEl = document.getElementById("hue-range"),
//      saturationRangeEl = document.getElementById("saturation-range"),
//      lightnessRangeEl = document.getElementById("lightness-range");

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
// const brushSizeBoxEl = document.getElementById("brush-size-box");

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


function setUp() {
  setUpPaperSize();
  setUpClear();
  setUpSave();
  setUpBrushColor();
  setUpBrushSize();
  setUpDrawing();
  setUpCanvas(
    (0.7 * menuEl.clientWidth),
    (0.5 * menuEl.clientWidth)
  );
}


setUp();