import VFibDataArray from './data.js';
import { amplitudeScale, timeScale } from './scale_slide.js';

const dataArray = VFibDataArray;

const canvas = document.getElementById('augmentedECGCanvas');
const ctx = canvas.getContext('2d');

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

let prevYValue = 0;

// Animation variables
let offset = 0; // This variable is use to track the horizontal scrolling

//This array is for adding randomness for each datapoint
let randomOffsets = new Array(dataArray.length).fill(0);    

//This array is for adding randomness for a whole section. I expect to make 5 sections.
let randomSectionOffsets = new Array(dataArray.length).fill(0);

//This array is for adding noise to 1 whole loop. 1 noise last for 20 data point, which is 2 seconds. We intend to add 1 to 2 noises per loop.
let noiseArray = dataArray;
let noisePositions = [];

function getRandomValue(min, max) {
    return Math.random() * (max - min) + min;
}

function updateRandomOffsets() {
    // We update random values for each point in the dataArray. This is done at the start of everyloop.
    for (let i = 0; i < dataArray.length; i++) {
        randomOffsets[i] = getRandomValue(-dataArray[i] * 0.5, dataArray[i] * 0.5);
    }
}

function updateNoise() {
    noisePositions = []; // Reset noise position.
    noiseArray = [...dataArray]; // We reset noise array.

    // Here, we randomly add 1 or 2 noise segments per loop
    const numberOfNoises = Math.floor(getRandomValue(1, 3));
    for (let n = 0; n < numberOfNoises; n++) {
        const noiseStartPosition = Math.floor(getRandomValue(0, dataArray.length - 20));
        noisePositions.push({ start: noiseStartPosition, end: noiseStartPosition + 19 });

        for (let i = noiseStartPosition; i <= noiseStartPosition + 19; i++) {
            noiseArray[i] = getRandomValue(-2000, 3000);
        }
    }
}

let startEndIndexArray = [];

const numberOfSection = 3;
const sectionWidth = (dataArray.length - dataArray.length % numberOfSection) / numberOfSection;
let parabolaConstant = 0.05;
function updateSectionRandomOffsets() {
    let sectionRandomOffset = 0;
    startEndIndexArray = [];

    for (let sectionIndex = 0; sectionIndex < numberOfSection; sectionIndex++) {
        const sectionStart = sectionIndex * sectionWidth;
        const sectionEnd = sectionIndex === numberOfSection - 1
            ? dataArray.length //In case the last section do not have enough number of elements equal to sectionWidth.
            : sectionStart + sectionWidth;
        startEndIndexArray.push(sectionStart, sectionEnd);

        if (sectionIndex % 2 === 0) sectionRandomOffset = getRandomValue(0, 1000);
        else if (sectionIndex % 2 === 1) sectionRandomOffset = getRandomValue(-1000, 0);

        // We apply the random offset to all indices in this section
        if (sectionRandomOffset > 0) {
            for (let i = sectionStart; i < sectionEnd; i++) {
                randomSectionOffsets[i] = (sectionWidth/2)*(sectionWidth/2)*parabolaConstant - parabolaConstant * (i - sectionStart - sectionWidth/2) * (i - sectionStart - sectionWidth/2);
            }
        }
        else {
            for (let i = sectionStart; i < sectionEnd; i++) {
                randomSectionOffsets[i] = -(sectionWidth/2)*(sectionWidth/2)*parabolaConstant + parabolaConstant * (i - sectionStart - sectionWidth/2) * (i - sectionStart - sectionWidth/2);
            }
        }
    }
}

function drawRedLine(x) {
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvasHeight);
    ctx.stroke();
}

function drawECG() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // This is to create grid lines
    ctx.strokeStyle = "#ddd";
    ctx.lineWidth = 1;
    for (let x = 0; x < canvasWidth; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvasHeight);
        ctx.stroke();
    }
    for (let y = 0; y < canvasHeight; y += 50) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvasWidth, y);
        ctx.stroke();
    }

    //draw red line for start and end of a section
    for (let i = 0; i < startEndIndexArray.length; i++) {
        let x = startEndIndexArray[i] * timeScale - offset;
        drawRedLine(x);
    }

    // Draw the ECG waveform
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;
    ctx.beginPath();
    const startY = canvasHeight / 2;

    for (let x = 0; x <= canvasWidth; x++) {
        const dataIndex = Math.floor((x + offset) / timeScale) % dataArray.length;
        const yValue = startY - (noiseArray[dataIndex] + randomOffsets[dataIndex] + randomSectionOffsets[dataIndex]) * amplitudeScale;

        if (yValue >= startY - 1000 * amplitudeScale) {
            if (x === 0) {
                ctx.moveTo(x, yValue);
            } else {
                ctx.lineTo(x, yValue);
            }
        }
    }

    ctx.stroke();

    offset = (offset + 1) % (dataArray.length * timeScale);
    if (offset === 1) {
        updateSectionRandomOffsets();
        console.log(randomSectionOffsets);
    }

    requestAnimationFrame(drawECG);
}

drawECG();