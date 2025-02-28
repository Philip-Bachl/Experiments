"use strict";

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
}

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
    const startLength = meshStart.points.length;
    const endLength = meshEnd.points.length;
    const largerLength = startLength > endLength ? startLength : endLength;

    if (startLength < 1 || endLength < 1) return new Shape([]);

    const newPoints = [];

    for (let i = 0; i < largerLength; i++) {
        const startPoint = meshStart.points[Math.floor(i * startLength / largerLength)];

        const endPoint = meshEnd.points[Math.floor(i * endLength / largerLength)];

        const betweenPoint = lerpPoints(startPoint, endPoint, t);

        newPoints.push(betweenPoint);
    }

    return new Shape(newPoints);
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

function randomPoligon(pointCount) {
    const points = [];

    for (let i = 0; i < pointCount; i++) {
        points.push(new Point(Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)));
    }

    return new Shape(points);
}

export { Point, Shape, lerpValues, lerpPoints, lerpShapes, regularPoligon, randomPoligon };