// CHANGING COLORS OF (COLOR RANGE INPUTS, COLORBOX AND BRUSHSIZEBOX) BY THE VALUES OF COLOR RANGE INPUTS

const hueRangeEl = document.getElementById("hue-range"),
  saturationRangeEl = document.getElementById("saturation-range"),
  lightnessRangeEl = document.getElementById("lightness-range"),
  colorBoxEl = document.getElementById("color-box"),
  brushSizeBoxEl = document.getElementById("brush-size-box"),
  hueCssEl = document.getElementById("hue-css"),
  saturationCssEl = document.getElementById("saturation-css"),
  lightnessCssEl = document.getElementById("lightness-css");


function changeHueRangeColor(saturationValue, lightnessValue) {
  gradientColors = "";
  for (let i = 0; i <= 360; i += 10) {
    gradientColors += `hsl(${i}, ${saturationValue}%, ${lightnessValue}%),`;
  }
  gradientColors = gradientColors.slice(0, -1);
  hueCssEl.innerHTML = `
    #hue-range::-webkit-slider-runnable-track {
        background: -webkit-linear-gradient(left, ${gradientColors});
    }`;
}

function changeSaturationRangeColor(hueValue, lightnessValue) {
  gradientColors = "";
  for (let i = 0; i <= 100; i += 10) {
    gradientColors += `hsl(${hueValue}, ${i}%, ${lightnessValue}%),`;
  }
  gradientColors = gradientColors.slice(0, -1);
  saturationCssEl.innerHTML = `
    #saturation-range::-webkit-slider-runnable-track {
        background: -webkit-linear-gradient(left, ${gradientColors});
    }`;
}

function changeLightnessRangeColor(hueValue, saturationValue) {
  gradientColors = "";
  for (let i = 0; i <= 100; i += 10) {
    gradientColors += `hsl(${hueValue}, ${saturationValue}%, ${i}%),`;
  }
  gradientColors = gradientColors.slice(0, -1);
  lightnessCssEl.innerHTML = `
    #lightness-range::-webkit-slider-runnable-track {
        background: -webkit-linear-gradient(left, ${gradientColors});
    }`;
}

function changeColorBoxColor(hueValue, saturationValue, lightnessValue) {
  colorBoxEl.style.backgroundColor = `hsl(${hueValue}, ${saturationValue}%, ${lightnessValue}%)`;
}

function changeBrushSizeBoxColor(hueValue, saturationValue, lightnessValue) {
  brushSizeBoxEl.style.backgroundColor = `hsl(${hueValue}, ${saturationValue}%, ${lightnessValue}%)`;
}


// SETUP 

function setUpColors() {
  // initial colors
  changeHueRangeColor(saturationRangeEl.value, lightnessRangeEl.value);
  changeSaturationRangeColor(hueRangeEl.value, lightnessRangeEl.value);
  changeLightnessRangeColor(hueRangeEl.value, saturationRangeEl.value);
  changeColorBoxColor(hueRangeEl.value, saturationRangeEl.value, lightnessRangeEl.value);
  changeBrushSizeBoxColor(hueRangeEl.value, saturationRangeEl.value, lightnessRangeEl.value);

  // addEventListeners
  hueRangeEl.addEventListener("change", () => {
    changeSaturationRangeColor(hueRangeEl.value, lightnessRangeEl.value);
    changeLightnessRangeColor(hueRangeEl.value, saturationRangeEl.value);
    changeColorBoxColor(hueRangeEl.value, saturationRangeEl.value, lightnessRangeEl.value);
    changeBrushSizeBoxColor(hueRangeEl.value, saturationRangeEl.value, lightnessRangeEl.value);
  });

  saturationRangeEl.addEventListener("change", () => {
    changeHueRangeColor(saturationRangeEl.value, lightnessRangeEl.value);
    changeLightnessRangeColor(hueRangeEl.value, saturationRangeEl.value);
    changeColorBoxColor(hueRangeEl.value, saturationRangeEl.value, lightnessRangeEl.value);
    changeBrushSizeBoxColor(hueRangeEl.value, saturationRangeEl.value, lightnessRangeEl.value);
  });

  lightnessRangeEl.addEventListener("change", () => {
    changeHueRangeColor(saturationRangeEl.value, lightnessRangeEl.value);
    changeSaturationRangeColor(hueRangeEl.value, lightnessRangeEl.value);
    changeColorBoxColor(hueRangeEl.value, saturationRangeEl.value, lightnessRangeEl.value);
    changeBrushSizeBoxColor(hueRangeEl.value, saturationRangeEl.value, lightnessRangeEl.value);
  });
}

setUpColors();
