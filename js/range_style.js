// hue_css          automatically catches   <style id="hue_css"></style>
// saturation_css   automatically catches   <style id="saturation_css"></style>
// lightness_css    automatically catches   <style id="lightness_css"></style>

let hueRange = document.getElementById("hue_range");
let saturationRange = document.getElementById("saturation_range");
let lightnessRange = document.getElementById("lightness_range");


hueRange.addEventListener("change", function() {
    changeSaturationRangeColor(hueRange.value, lightnessRange.value);
    changeLightnessRangeColor(hueRange.value, saturationRange.value);
});

saturationRange.addEventListener("change", function() {
    changeHueRangeColor(saturationRange.value, lightnessRange.value);
    changeLightnessRangeColor(hueRange.value, saturationRange.value);
});

lightnessRange.addEventListener("change", function() {
    changeHueRangeColor(saturationRange.value, lightnessRange.value);
    changeSaturationRangeColor(hueRange.value, lightnessRange.value);
});


changeHueRangeColor(saturationRange.value, lightnessRange.value);
changeSaturationRangeColor(hueRange.value, lightnessRange.value);
changeLightnessRangeColor(hueRange.value, saturationRange.value);


function changeHueRangeColor(saturationValue, lightnessValue) {
    gradientColors = "";
    for (let i = 0; i <= 360; i += 10) {
        gradientColors += `hsla(${i}, ${saturationValue}%, ${lightnessValue}%, 1),`;
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
        gradientColors += `hsla(${hueValue}, ${i}%, ${lightnessValue}%, 1),`;
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
        gradientColors += `hsla(${hueValue}, ${saturationValue}%, ${i}%, 1),`;
    };
    gradientColors = gradientColors.slice(0, -1);
    lightness_css.innerHTML = `
        #lightness_range::-webkit-slider-runnable-track {
            background: -webkit-linear-gradient(left, ${gradientColors});
        }`;
}