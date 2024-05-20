const draggables = document.querySelectorAll(".draggable");
const relativePos = [0, 0];

let grabbed = null;

draggables.forEach(d => {
    d.addEventListener("mousedown", e => {
        grabbed = d;
        relativePos[0] = d.getBoundingClientRect().x - e.clientX;
        relativePos[1] = d.getBoundingClientRect().y - e.clientY;
    });
});

document.addEventListener("mousemove", e => {
    if (!grabbed) return;
    grabbed.style.left = (e.clientX + relativePos[0]) + "px";
    grabbed.style.top = (e.clientY + relativePos[1]) + "px";
});

document.addEventListener("mouseup", e => {
    if (grabbed) grabbed = null;
});