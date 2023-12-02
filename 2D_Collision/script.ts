const canvas = document.querySelector("canvas");
const ctx = canvas?.getContext("2d");

class Point {
    constructor(public x: number, public y: number) {}
}

class Line {
    constructor(public pointA: Point, public pointB: Point) {}
}

class Mesh {
    constructor(public lines: Line[]) {}
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
*/

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

function drawLine(line: Line) {
    ctx?.beginPath();

    ctx?.moveTo(line.pointA.x, line.pointA.y);
    ctx?.lineTo(line.pointB.x, line.pointB.y);
    
    ctx?.stroke();
}

function drawMesh(mesh: Mesh) {
    mesh.lines.forEach(l => drawLine(l));
}
