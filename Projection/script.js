const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const cordScale = 100;

let staticCd = [3, 2];

document.addEventListener("mousemove", mouseEvent => {

    const mouseVector = [(mouseEvent.clientX - canvas.width / 2) / cordScale,  (mouseEvent.clientY - canvas.height / 2) / -cordScale];
    
    reset();
    drawVector(staticCd);
    drawVector(mouseVector);
    
    ctx.strokeStyle = "red";
    ctx.lineWidth = 3;
    
    drawVector(project(mouseVector, staticCd));
});


function reset() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
}

function drawVector(vector) {
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.lineTo(canvas.width / 2 + vector[0] * cordScale, vector[1] * -cordScale + canvas.height / 2);
    ctx.stroke();
}

function project(ab, cd) {
    const a = ab[0];
    const b = ab[1];
    const c = cd[0];
    const d = cd[1];

    scale = scalar(a, b, c, d);

    return [cd[0] * scale, cd[1] * scale];
}

function scalar(a, b, c ,d) {
    return (a * c + b * d) / (c * c + d * d);
}