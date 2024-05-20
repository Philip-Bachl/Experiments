class Point {
    x;
    y;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Shape {
    points;

    constructor(points) {
        this.points = points;
    }

    render(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.points[0].x * ctx.canvas.width / 100, this.points[0].y * ctx.canvas.height / 100);

        for (let i = 1; i < this.points.length; i++) {
            ctx.lineTo(this.points[i].x * ctx.canvas.width / 100, this.points[i].y * ctx.canvas.height / 100);
        }

        ctx.stroke();
    }
}

//---------------------------------------------------------------------------------
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let shapeOrder = 0;

let shape1 = regularPoligon(shapeOrder, 50, 50, 50);
let shape2 = regularPoligon(shapeOrder + 1, 50, 50, 50);

const animationLengthSeconds = 0.5;
let t = 0;
const animationInterval = setInterval(() => {
    t += 10 / animationLengthSeconds;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    lerpShapes(shape1, shape2, t / 1000).render(ctx);

    if (t >= 1000) {
        t = 0;
        shapeOrder++;
        shape1 = regularPoligon(shapeOrder, 50, 50, 50);
        shape2 = regularPoligon(shapeOrder + 1, 50, 50, 50);
    };
}, 10);

lerpShapes(shape1, shape2, 0.5).render(ctx);
//---------------------------------------------------------------------------------

function lerpValues(valueStart, valueEnd, t) {
    return (valueEnd - valueStart) * t + valueStart;
}

function lerpPoints(pointStart, pointEnd, t) {
    return new Point(
        lerpValues(pointStart.x, pointEnd.x, t),
        lerpValues(pointStart.y, pointEnd.y, t)
    );
}

function lerpShapes(meshStart, meshEnd, t) {
    if (meshStart.points.length < 1 || meshEnd.points.length < 1) return new Shape([]);

    const betweenShape = new Shape([]);
    const iterationCount = Math.max(meshStart.points.length, meshEnd.points.length);

    for (let i = 0; i < iterationCount; i++) {
        //Taking prev point if no available
        //could be changed to a random point instead
        const startPoint = (i + 1) > meshStart.points.length ? meshStart.points[meshStart.points.length - 1] : meshStart.points[i];
        const endPoint = (i + 1) > meshEnd.points.length ? meshEnd.points[meshEnd.points.length - 1] : meshEnd.points[i];
        const betweenPoint = lerpPoints(startPoint, endPoint, t);

        betweenShape.points.push(betweenPoint);
    }

    return betweenShape;
}

function regularPoligon(order, radius, xOffset, yOffset) {
    const shape = new Shape([]);
    const arcSize = 2 * Math.PI / order;

    for (let i = 0; i <= order; i++) {
        const point = new Point(
            Math.cos(arcSize * i) * radius + xOffset,
            Math.sin(arcSize * i) * radius + yOffset,
        );
        shape.points.push(point);
    }

    return shape;
}