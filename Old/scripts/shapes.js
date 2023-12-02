const body = document.querySelector("body");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const speed = 5;

let crossCoords;
let squareCoords;
let triangleCoords;

resize();

let shape = false;
let selectedShape = squareCoords;

// Point: {pos: {x, y}, velocity: {x, y}, endPos: {x, y}}
let points = [];
let counter = 0;

ctx.strokeStyle = "white";

ctx.lineWidth = "5";
ctx.lineJoin = "round";
ctx.strokeStyle = "white";
ctx.shadowColor = "white";
ctx.shadowBlur = "10";

for (let i = 0; i < 100; i++) {
    points.push({pos: {x: Math.random() * canvas.width, y: Math.random() * canvas.height}, velocity: {x: 0, y: 0}, endPos: {x: canvas.width / 2, y: canvas.height / 2}});
}

setInterval(update, 10);

window.addEventListener("resize", resize);

canvas.addEventListener("mouseenter", () => {
    if (selectedShape == crossCoords) {
        selectedShape = squareCoords;
    }else if (selectedShape == squareCoords) {
        selectedShape = triangleCoords;
    }else {
        selectedShape = crossCoords;
    }

    for (let i = 0; i < points.length; i++) {
        points[i].endPos = selectedShape[i % selectedShape.length];
    }
});

canvas.addEventListener("mouseleave", () => {
    for (let i = 0; i < points.length; i++) {

        points[i].endPos = {x: Math.random() * canvas.width, y: Math.random() * canvas.height};

    }
});

function update() {

    /*if (counter % 200 == 0) {
        if (Math.random() * 2 > 1) {
            selectedShape = squareCoords;
        }else {
            selectedShape = triangleCoords;
        }
        for (let i = 0; i < points.length; i++) {
            points[i].endPos = selectedShape[i % selectedShape.length];
        }
    }

    if (counter % 200 == 100) {
        for (let i = 0; i < points.length; i++) {

            points[i].endPos = {x: Math.random() * canvas.width, y: Math.random() * canvas.height};

        }
    }*/

    physicsUpdate();
    render();

    counter++;
}

function physicsUpdate() {
    
    for (let i = 0; i < points.length; i++) {

        points[i].velocity.x = points[i].endPos.x - points[i].pos.x;
        points[i].velocity.y = points[i].endPos.y - points[i].pos.y;



        points[i].velocity.x /= 100;
        points[i].velocity.y /= 100;

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

    crossCoords = [
        {x: canvas.width / 2, y: canvas.height / 2},
        {x: canvas.width / 2, y: canvas.height / 4}, 
        {x: canvas.width / 2, y: canvas.height * 3 / 4},
        {x: canvas.width / 2, y: canvas.height / 2},
        {x: canvas.width * 3 / 4, y: canvas.height / 2},
        {x: canvas.width / 4, y: canvas.height / 2}
    ];
    
    squareCoords = [
        {x: canvas.width / 4, y: canvas.height / 4}, 
        {x: canvas.width * 3 / 4, y: canvas.height / 4},
        {x: canvas.width * 3 / 4, y: canvas.height * 3 / 4},
        {x: canvas.width / 4, y: canvas.height * 3 / 4}
    ];
    
    triangleCoords = [
        {x: canvas.width / 2, y: canvas.height / 4}, 
        {x: canvas.width * 3 / 4, y: canvas.height * 3 / 4},
        {x: canvas.width / 4, y: canvas.height * 3 / 4}
    ];
}