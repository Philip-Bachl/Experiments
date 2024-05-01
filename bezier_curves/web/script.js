const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const canvasSize = visualViewport.width / 2;

canvas.width = canvasSize;
canvas.height = canvasSize;

const startPos = {x: canvasSize / 4, y: canvasSize / 2};
const controlPos = {x: canvasSize / 2, y: canvasSize / 4};
const endPos = {x: canvasSize * 3 / 4, y: canvasSize / 2};

const stepSize = 0.01;

let currentT = 0;
let currentPos;

document.addEventListener("mousemove", e => {
    controlPos.x = e.clientX;
    controlPos.y = e.clientY;

    clear();
    
    ctx.beginPath()
    ctx.moveTo(startPos.x, startPos.y);
    ctx.lineTo(controlPos.x, controlPos.y);
    ctx.lineTo(endPos.x, endPos.y);
    ctx.stroke();
});

update();

function update() {
    //clear();

    currentT = (currentT + stepSize) % 1;
    currentPos = bezierCurve(startPos, controlPos, endPos, currentT);

    ctx.beginPath()
    ctx.arc(currentPos.x, currentPos.y, 5, 0, 2*Math.PI);
    ctx.stroke();

    requestAnimationFrame(update);
}

function lerp(from, to, t) {
    return t * (to - from) + from;
}

function vectorLerp(from, to, t) {
    return { x: lerp(from.x, to.x, t), y: lerp(from.y, to.y, t) };
}

function bezierCurve(start, control, end, t) {
    const left = vectorLerp(start, control, t);
    const right = vectorLerp(control, end, t);
    
    return vectorLerp(left, right, t);
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}