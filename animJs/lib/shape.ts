class Point {
    constructor(public x: number, public y: number) {}
}

class Shape {
    constructor(public points: Point[]) {}

    public render(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.moveTo(this.points[0].x, this.points[0].y)

        for (let i = 1; i < this.points.length; i++) {
            ctx.lineTo(this.points[i].x, this.points[i].y);
        }

        ctx.stroke();
    }
}

function lerpValues(valueStart: number, valueEnd: number, t: number): number {
    return (valueEnd - valueStart) * t + valueStart;
}

function lerpPoints(pointStart: Point, pointEnd: Point, t: number): Point {
    return new Point(
        lerpValues(pointStart.x, pointEnd.x, t),
        lerpValues(pointStart.y, pointEnd.y, t)
    );
}

function lerpShapes(meshStart: Shape, meshEnd: Shape, t: number): Shape {
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

export { Point, Shape, lerpValues, lerpPoints, lerpShapes };