const body = document.querySelector("body");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const speed = 0.05;

const squareCoords = [
    {
        x: () => canvas.width / 4, 
        y: () => canvas.height / 4
    }, 
    {
        x: () => canvas.width * 3 / 4, 
        y: () => canvas.height / 4
    },
    {
        x: () => canvas.width * 3 / 4, 
        y: () => canvas.height * 3 / 4
    },
    {
        x: () => canvas.width / 4, 
        y: () => canvas.height * 3 / 4
    }
];

const triangleCoords = [
    {
        x: () => canvas.width / 2, 
        y: () => canvas.height / 4
    }, 
    {
        x: () => canvas.width * 3 / 4, 
        y: () => canvas.height * 3 / 4
    },
    {
        x: () => canvas.width / 4, 
        y: () => canvas.height * 3 / 4
    }
];

const crossCoords = [
    {
        x: () => canvas.width / 2, 
        y: () => canvas.height / 2
    },
    {
        x: () => canvas.width / 2, 
        y: () => canvas.height / 4
    }, 
    {
        x: () => canvas.width / 2, 
        y: () => canvas.height * 3 / 4}
        ,
    {
        x: () => canvas.width / 2, 
        y: () => canvas.height / 2
    },
    {
        x: () => canvas.width * 3 / 4, 
        y: () => canvas.height / 2
    },
    {
        x: () => canvas.width / 4,
        y: () => canvas.height / 2
    }
];

const allCoords = [squareCoords, triangleCoords, crossCoords];

resize();

let shape = false;
let selectedShape = squareCoords;

// Point: {pos: {x, y}, velocity: {x, y}, endPos: {x, y}}
let points = [];
let timer = 0;

ctx.lineWidth = "5";
ctx.lineJoin = "round";
ctx.strokeStyle = "white";
ctx.shadowColor = "white";
ctx.shadowBlur = "10";

for (let i = 0; i < 10; i++) {
    points.push({pos: {x: canvas.width / 2, y: canvas.height / 2}, velocity: {x: 0, y: 0}, endPos: {x: Math.random() * canvas.width, y: Math.random() * canvas.height}});
}

setInterval(update, 10);

window.addEventListener("resize", resize);

function update() {

    physicsUpdate();
    render();

    timer++;
}

function physicsUpdate() {

    if (timer % 100 == 0) {
        if (selectedShape == squareCoords) {
            selectedShape = triangleCoords
        }else if (selectedShape == triangleCoords) {
            selectedShape = crossCoords;
        }else {
            selectedShape = squareCoords;
        }
        for (let i = 0; i < points.length; i++) {
            points[i].endPos.x = selectedShape[i % selectedShape.length].x();
            points[i].endPos.y = selectedShape[i % selectedShape.length].y();
        }
    }
    
    for (let i = 0; i < points.length; i++) {

        points[i].velocity.x = points[i].endPos.x - points[i].pos.x;
        points[i].velocity.y = points[i].endPos.y - points[i].pos.y;

        points[i].velocity.x *= speed;
        points[i].velocity.y *= speed;
        
        points[i].pos.x += points[i].velocity.x;
        points[i].pos.y += points[i].velocity.y;
    }
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.moveTo(points[0].pos.x, points[0].pos.y);

    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].pos.x, points[i].pos.y);
    }

    ctx.closePath();
    ctx.stroke();
}

function resize() {
    canvas.width = window.visualViewport.width;
    canvas.height = window.visualViewport.height;
    ctx.strokeStyle = "white";
}

function divideCanvas(x, y) {
    return {x: canvas.width / x, y: canvas.height / y};
}