const body = document.querySelector("body");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const percision = 100;

let clickState = "start";

let mouseStartPoint = {x: 0, y: 0};
let mouseControlPoint = {x: 0, y: 0};
let mouseEndPoint = {x: 0, y: 0};

document.addEventListener("mousemove", mouseEvent => {
    switch (clickState) {
        case "start":
            mouseStartPoint.x = mouseEvent.clientX;
            mouseStartPoint.y = mouseEvent.clientY;

            break;
        case "control":
            mouseControlPoint.x = mouseEvent.clientX;
            mouseControlPoint.y = mouseEvent.clientY;

            break;
        case "end":
            mouseEndPoint.x = mouseEvent.clientX;
            mouseEndPoint.y = mouseEvent.clientY;

            break;
    }
    
});

document.addEventListener("keydown", mouseEvent => {
    switch (clickState) {
        case "start":
            clickState = "end";
            break;
        case "control":
            clickState = "start";
            break;
        case "end":
            clickState = "control";
            break;
    }
    
});

ctx.lineWidth = "1";
ctx.lineJoin = "round";
ctx.strokeStyle = "white";
ctx.fillStyle = "white";
ctx.shadowColor = "white";
ctx.shadowBlur = "10";

setInterval(() => {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.moveTo(mouseStartPoint.x, mouseStartPoint.y);
    ctx.bezierCurveTo(mouseControlPoint.x, mouseControlPoint.y, mouseControlPoint.x, mouseControlPoint.y, mouseEndPoint.x, mouseEndPoint.y);
    ctx.stroke();

}, 10);