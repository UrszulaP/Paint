// CHANGING COLORS OF (COLOR RANGE INPUTS, COLORBOX AND BRUSHSIZEBOX) BY THE VALUES OF COLOR RANGE INPUTS

// hue_css          automatically catches   <style id="hue_css"></style>
// saturation_css   automatically catches   <style id="saturation_css"></style>
// lightness_css    automatically catches   <style id="lightness_css"></style>

let hueRange = document.getElementById("hue_range");
let saturationRange = document.getElementById("saturation_range");
let lightnessRange = document.getElementById("lightness_range");
let colorBox = document.getElementById("color_box");
let brushSizeBox = document.getElementById("brush_size_box");


hueRange.addEventListener("change", function() {
    changeSaturationRangeColor(hueRange.value, lightnessRange.value);
    changeLightnessRangeColor(hueRange.value, saturationRange.value);
    changeColorBoxColor(hueRange.value, saturationRange.value, lightnessRange.value);
    changeBrushSizeBoxColor(hueRange.value, saturationRange.value, lightnessRange.value);
});

saturationRange.addEventListener("change", function() {
    changeHueRangeColor(saturationRange.value, lightnessRange.value);
    changeLightnessRangeColor(hueRange.value, saturationRange.value);
    changeColorBoxColor(hueRange.value, saturationRange.value, lightnessRange.value);
    changeBrushSizeBoxColor(hueRange.value, saturationRange.value, lightnessRange.value);
});

lightnessRange.addEventListener("change", function() {
    changeHueRangeColor(saturationRange.value, lightnessRange.value);
    changeSaturationRangeColor(hueRange.value, lightnessRange.value);
    changeColorBoxColor(hueRange.value, saturationRange.value, lightnessRange.value);
    changeBrushSizeBoxColor(hueRange.value, saturationRange.value, lightnessRange.value);
});


function changeHueRangeColor(saturationValue, lightnessValue) {
    gradientColors = "";
    for (let i = 0; i <= 360; i += 10) {
        gradientColors += `hsl(${i}, ${saturationValue}%, ${lightnessValue}%),`;
    };
    gradientColors = gradientColors.slice(0, -1);
    hue_css.innerHTML = `
        #hue_range::-webkit-slider-runnable-track {
            background: -webkit-linear-gradient(left, ${gradientColors});
        }`;
}

function changeSaturationRangeColor(hueValue, lightnessValue) {
    gradientColors = "";
    for (let i = 0; i <= 100; i += 10) {
        gradientColors += `hsl(${hueValue}, ${i}%, ${lightnessValue}%),`;
    };
    gradientColors = gradientColors.slice(0, -1);
    saturation_css.innerHTML = `
        #saturation_range::-webkit-slider-runnable-track {
            background: -webkit-linear-gradient(left, ${gradientColors});
        }`;
}

function changeLightnessRangeColor(hueValue, saturationValue) {
    gradientColors = "";
    for (let i = 0; i <= 100; i += 10) {
        gradientColors += `hsl(${hueValue}, ${saturationValue}%, ${i}%),`;
    };
    gradientColors = gradientColors.slice(0, -1);
    lightness_css.innerHTML = `
        #lightness_range::-webkit-slider-runnable-track {
            background: -webkit-linear-gradient(left, ${gradientColors});
        }`;
}

function changeColorBoxColor(hueValue, saturationValue, lightnessValue) {
    colorBox.style.backgroundColor = `hsl(${hueValue}, ${saturationValue}%, ${lightnessValue}%)`;
}

function changeBrushSizeBoxColor(hueValue, saturationValue, lightnessValue) {
    brushSizeBox.style.backgroundColor = `hsl(${hueValue}, ${saturationValue}%, ${lightnessValue}%)`;
}


// SETUP 

changeHueRangeColor(saturationRange.value, lightnessRange.value);
changeSaturationRangeColor(hueRange.value, lightnessRange.value);
changeLightnessRangeColor(hueRange.value, saturationRange.value);
changeColorBoxColor(hueRange.value, saturationRange.value, lightnessRange.value);
changeBrushSizeBoxColor(hueRange.value, saturationRange.value, lightnessRange.value);