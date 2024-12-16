import VFibDataArray from './data.js';

const dataArray = VFibDataArray;

const canvas = document.getElementById('augmentedECGCanvas');
const ctx = canvas.getContext('2d');

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

// These are scaling factors
const amplitudeScale = 0.1; 
const timeScale = 2; 

// Animation variables
let offset = 0; // This variable is use to track the horizontal scrolling

//This array is for adding randomness for each datapoint
let randomOffsets = new Array(dataArray.length).fill(0);    

//This array is for adding randomness for a whole section. I expect to make 5 sections.
let randomSectionOffsets = new Array(dataArray.length).fill(0);

function getRandomValue(min, max) {
    return Math.random() * (max - min) + min;
}

function updateRandomOffsets() {
    // We update random values for each point in the dataArray. This is done at the start of everyloop.
    for (let i = 0; i < dataArray.length; i++) {
        randomOffsets[i] = getRandomValue(-dataArray[i] * 0.5, dataArray[i] * 0.5);
    }
}

const numberOfSection = 5;
const sectionWidth = (dataArray.length - dataArray.length % numberOfSection) / numberOfSection;
function updateSectionRandomOffsets() {
    let sectionRandomOffset = 0;

    for (let sectionIndex = 0; sectionIndex < numberOfSection; sectionIndex++) {
        const sectionStart = sectionIndex * sectionWidth;
        const sectionEnd = sectionIndex === numberOfSection - 1
            ? dataArray.length //In case the last section do not have enough number of elements equal to sectionWidth.
            : sectionStart + sectionWidth;

        if (sectionIndex % 2 === 0) sectionRandomOffset = getRandomValue(0, 1000);
        else if (sectionIndex % 2 === 1) sectionRandomOffset = getRandomValue(-1000, 0);

        // We apply the random offset to all indices in this section
        for (let i = sectionStart; i < sectionEnd; i++) {
            randomSectionOffsets[i] = sectionRandomOffset;
        }
    }
}

function drawECG() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // This is to create grid line
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

    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;
    ctx.beginPath();
    let startY = canvasHeight / 2;
    //End of grid line code.

    //This is where we start drawing our ECG waveform.
    for (let x = 0; x <= canvasWidth; x++) {
        let dataIndex = Math.floor((x + offset) / timeScale) % dataArray.length;
        let yValue = startY - (dataArray[dataIndex] +  randomOffsets[dataIndex] + randomSectionOffsets[dataIndex]) * amplitudeScale;
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
        updateRandomOffsets();
        updateSectionRandomOffsets();
        console.log(randomSectionOffsets);
    }

    requestAnimationFrame(drawECG);
}

drawECG();