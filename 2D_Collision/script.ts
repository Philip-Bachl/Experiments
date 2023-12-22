const canvas = document.querySelector("canvas");
const ctx = canvas?.getContext("2d");

const inputTouple = [false, false, false, false];

interface Drawable {
    draw(ctx: CanvasRenderingContext2D): void;
}

class Point {
    constructor(public x: number, public y: number) {}
}

class Line implements Drawable{
    constructor(public pointA: Point, public pointB: Point) {}

    overlapColPoint(line: Line): Point | null {
        const diff1X = (this.pointA.x - this.pointB.x);
        const diff1Y = (this.pointA.y - this.pointB.y);
        
        const diff2X = (line.pointA.x - line.pointB.x)
        const diff2Y = (line.pointA.y - line.pointB.y)

        const denomi = (diff1X * diff2Y - diff1Y * diff2X);

        if (denomi == 0) return null;
        
        const multDiff1 = (this.pointA.x * this.pointB.y - this.pointA.y * this.pointB.x);
        const multDiff2 = (line.pointA.x * line.pointB.y - line.pointA.y * line.pointB.x);

        const px = (multDiff1 * diff2X - diff1X * multDiff2) / denomi;
        const py = (multDiff1 * diff2Y - diff1Y * multDiff2) / denomi;

        return new Point(px, py);
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();

        ctx.moveTo(this.pointA.x, this.pointA.y);
        ctx.lineTo(this.pointB.x, this.pointB.y);

        ctx.stroke();
    }
}

class CollisionPoint {
    constructor(public line1: Line, public line2: Line, public point: Point) {}
}

class Mesh implements Drawable {
    constructor(public lines: Line[]) {}
    collisionPoints(mesh: Mesh): CollisionPoint[] {
        const colPoints: CollisionPoint[] = [];

        this.lines.forEach(l1 => {
            mesh.lines.forEach(l2 => {
                const colPoint = l1.overlapColPoint(l2);
                
                if (colPoint) colPoints.push(new CollisionPoint(l1, l2, colPoint));
            });
        });

        return colPoints;
    }
    
    draw(ctx: CanvasRenderingContext2D): void {
        this.lines.forEach(l => l.draw(ctx));
    }
}

/* 
x1 = line1.pointA.x
x2 = line1.pointB.x
x3 = line2.pointA.x
x4 = line2.pointB.x

y1 = line1.pointA.y
y2 = line1.pointB.y
y3 = line2.pointA.y
y4 = line2.pointB.y


function lineColPoint(line1: Line, line2: Line): Point | null {
    const diff1X = (line1.pointA.x - line1.pointB.x);
    const diff1Y = (line1.pointA.y - line1.pointB.y);
    
    const diff2X = (line2.pointA.x - line2.pointB.x)
    const diff2Y = (line2.pointA.y - line2.pointB.y)

    const denomi = (diff1X * diff2Y - diff1Y * diff2X);

    if (denomi == 0) return null;
    
    const multDiff1 = (line1.pointA.x * line1.pointB.y - line1.pointA.y * line1.pointB.x);
    const multDiff2 = (line2.pointA.x * line2.pointB.y - line2.pointA.y * line2.pointB.x);

    const px = (multDiff1 * diff2X - diff1X * multDiff2) / denomi;
    const py = (multDiff1 * diff2Y - diff1Y * multDiff2) / denomi;

    return new Point(px, py);
}
*/
