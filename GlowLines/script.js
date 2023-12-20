const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const points = [];
const pointCount = 20;

ctx.strokeStyle = "white";

class Point {
    x;
    y;
    velocity = {x: 0, y: 0};

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

for (let i = 0; i < pointCount; i++) {
    points.push(new Point(Math.random() * canvas.width, Math.random() * canvas.height));
}

setInterval(update, 10);
setInterval(slowUpdate, 1000)

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < points.length; i++) {

        if (!isInbounds(points[i])) {
            points[i].velocity.x *= -1;
            points[i].velocity.y *= -1;
        }

        points[i].x += points[i].velocity.x;
        points[i].y += points[i].velocity.y;
        const p1 = points[i];

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, 5, 0, 2 * Math.PI);
        ctx.stroke();

        for (j = i; j < points.length; j++) {
            const p2 = points[j];
            
            if (distance(p1, p2) > (canvas.width + canvas.height) / 8) {
                continue;
            }

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
        }
    }
}

function slowUpdate() {
    points.forEach(p => {
        p.velocity.x = (Math.random() - 0.5) * 5;
        p.velocity.y = (Math.random() - 0.5) * 5;
    });
}

function isInbounds(point) {
    return (point.x > 0 && point.x < canvas.width && point.y > 0 && point.y < canvas.height);
}

function lengthV(vector) {
    return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
}

function distance(p1, p2) {
    return lengthV({x: Math.abs(p1.x - p2.x), y: Math.abs(p1.y - p2.y)});
}

