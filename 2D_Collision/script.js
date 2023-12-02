const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// line1, line2 = {a: {x, y}, b: {x, y}}
/* 
x1 = line1.a.x
x2 = line1.b.x
x3 = line2.a.x
x4 = line2.b.x

y1 = line1.a.y
y2 = line1.b.y
y3 = line2.a.y
y4 = line2.b.y
*/
function lineColPoint(line1, line2) {
    
    const diff1X = (line1.a.x - line1.b.x);
    const diff1Y = (line1.a.y - line1.b.y);
    
    const diff2X = (line2.a.x - line2.b.x)
    const diff2Y = (line2.a.y - line2.b.y)

    const denomi = (diff1X * diff2Y - diff1Y * diff2X);

    if (denomi == 0) return false;
    
    const multDiff1 = (line1.a.x * line1.b.y - line1.a.y * line1.b.x);
    const multDiff2 = (line2.a.x * line2.b.y - line2.a.y * line2.b.x);

    let px = (multDiff1 * diff2X - diff1X * multDiff2) / denomi;
    let py = (multDiff1 * diff2Y - diff1Y * multDiff2) / denomi;
}

// line = {a: {x, y}, b: {x, y}}
function drawLine(line) {
    ctx.beginPath();

    ctx.moveTo(line.a.x, line.a.y);
    ctx.lineTo(line.b.x, line.b.y);
    
    ctx.stroke();
}