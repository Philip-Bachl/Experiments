"use strict";

import { lerpShapes, randomPoligon, regularPoligon } from "./lib.js";
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let shapeOrder = 0;

let shape1 = regularPoligon(1, 50, 50, 50);
let shape2 = regularPoligon(10, 50, 50, 50);

let milliseconds = 0;
const animationInterval = setInterval(() => {
    milliseconds += 10;

    clear();
    render(lerpShapes(shape1, shape2, Math.min(milliseconds / 1000, 1)));
    if (milliseconds > 1500) {
        milliseconds = 0;
        shape1 = shape2;

        const indecies = Math.floor(Math.random() * 10 + 3);

        if (Math.random() > 0.5) {
            shape2 = randomPoligon(indecies);
        } else {
            shape2 = regularPoligon(indecies, 50, 50, 50);
        }
    };
}, 10);

function clear() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function render(shape) {
    ctx.beginPath();
    ctx.moveTo(shape.points[0].x * ctx.canvas.width / 100, shape.points[0].y * ctx.canvas.height / 100);
    for (let i = 1; i < shape.points.length; i++) {
        ctx.lineTo(shape.points[i].x * ctx.canvas.width / 100, shape.points[i].y * ctx.canvas.height / 100);
    }
    ctx.stroke();
}
