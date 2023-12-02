const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const size = 200;

let height = 0;
let width = 0;

// particle: {x, y}
let particles = [];

document.addEventListener("mousemove", mouseEvent => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {

        let particleHypot = Math.hypot(particles[i].x - mouseEvent.clientX, particles[i].y - mouseEvent.clientY);

        let newScale = particleHypot / 500;
        newScale = Math.min(1, Math.max(newScale, 0));
        newScale *= size

        ctx.beginPath();
        ctx.rect(particles[i].x - newScale / 2, particles[i].y - newScale / 2, newScale, newScale);
        ctx.stroke();
    }
});

window.addEventListener("resize", resize);

resize();

function resize() {

    let newWidth = window.visualViewport.width;
    let newHeight = window.visualViewport.height;

    width = Math.floor(newWidth / size) + 2;
    height = Math.floor(newHeight / size) + 2;

    canvas.width = width * size;
    canvas.height = height * size;

    particles = [];
    for (let i = 0; i < height * size; i += size) {
        for (let ii = 0; ii < width * size; ii += size) {
            particles.push({x: ii, y: i});
        }
    }
    
    ctx.lineWidth = "1";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "rgb(200, 200, 200)";
    ctx.shadowBlur = "10";

}