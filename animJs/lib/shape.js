"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lerpShapes = exports.lerpPoints = exports.lerpValues = exports.Shape = exports.Point = void 0;
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point;
}());
exports.Point = Point;
var Shape = /** @class */ (function () {
    function Shape(points) {
        this.points = points;
    }
    Shape.prototype.render = function (ctx) {
        ctx.beginPath();
        ctx.moveTo(this.points[0].x, this.points[0].y);
        for (var i = 1; i < this.points.length; i++) {
            ctx.lineTo(this.points[i].x, this.points[i].y);
        }
        ctx.stroke();
    };
    return Shape;
}());
exports.Shape = Shape;
function lerpValues(valueStart, valueEnd, t) {
    return (valueEnd - valueStart) * t + valueStart;
}
exports.lerpValues = lerpValues;
function lerpPoints(pointStart, pointEnd, t) {
    return new Point(lerpValues(pointStart.x, pointEnd.x, t), lerpValues(pointStart.y, pointEnd.y, t));
}
exports.lerpPoints = lerpPoints;
function lerpShapes(meshStart, meshEnd, t) {
    if (meshStart.points.length < 1 || meshEnd.points.length < 1)
        return new Shape([]);
    var betweenShape = new Shape([]);
    var iterationCount = Math.max(meshStart.points.length, meshEnd.points.length);
    for (var i = 0; i < iterationCount; i++) {
        //Taking prev point if no available
        //could be changed to a random point instead
        var startPoint = (i + 1) > meshStart.points.length ? meshStart.points[meshStart.points.length - 1] : meshStart.points[i];
        var endPoint = (i + 1) > meshEnd.points.length ? meshEnd.points[meshEnd.points.length - 1] : meshEnd.points[i];
        var betweenPoint = lerpPoints(startPoint, endPoint, t);
        betweenShape.points.push(betweenPoint);
    }
    return betweenShape;
}
exports.lerpShapes = lerpShapes;
