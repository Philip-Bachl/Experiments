const body = document.querySelector("body");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const speed = 5;

resize();

// Point: {pos: {x, y}, velocity: {x, y}, endPos: {x, y}}
let points = [];
let counter = 0;

ctx.lineWidth = "10";
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.strokeStyle = "white";
ctx.shadowColor = "white";
ctx.shadowBlur = "10";

for (let i = 0; i < 3; i++) {
    points.push({pos: {x: canvas.width / 2, y: canvas.height / 2}, velocity: {x: 0, y: 0}, endPos: {x: Math.random() * canvas.width, y: Math.random() * canvas.height}});
}

setInterval(update, 10);

window.addEventListener("resize", resize);

canvas.addEventListener("mouseenter", () => {
    for (let i = 0; i < points.length; i++) {
        points[i].endPos = {x: Math.random() * canvas.width, y: Math.random() * canvas.height};
        followFlag = false;
    }
});

canvas.addEventListener("mouseleave", () => {
    for (let i = 0; i < points.length; i++) {
        points[i].endPos = {x: Math.random() * canvas.width, y: Math.random() * canvas.height};
        followFlag = false;
    }
});

function update() {

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
    ctx.fill();
    ctx.stroke();
}

function resize() {
    canvas.width = window.visualViewport.width;
    canvas.height = window.visualViewport.height;
    ctx.lineWidth = "10";
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.strokeStyle = "white";
    ctx.shadowColor = "white";
    ctx.shadowBlur = "10";
}