const anchors = document.querySelectorAll(".anchor");
const grabs = document.querySelectorAll(".grab");

let handElement = null;

grabs.forEach(element => {
    element.style.position = "absolute";
    element.addEventListener("mousedown", mouseEvent => {
        handElement = element;
    });
});

document.addEventListener("mouseup", mouseEvent => {
    if (!handElement) return;

    let nearestAnchor = anchors[0];

    for (let i = 1; i < anchors.length; i++) {
        if (distance(anchors[i], handElement) < distance(nearestAnchor, handElement)) nearestAnchor = anchors[i];
    }

    const handBoundingRect = handElement.getBoundingClientRect();
    const anchorBoundingRect = nearestAnchor.getBoundingClientRect();
    
    handElement.style.left = anchorBoundingRect.left + "px";
    handElement.style.top = anchorBoundingRect.top + "px";

    console.log(handElement.style.left, handElement.style.top);

    handElement = null
});

document.addEventListener("mousemove", mouseEvent => {
    if (!handElement) return;
    
    const handBoundingRect = handElement.getBoundingClientRect();

    handElement.style.left = (mouseEvent.clientX - (handBoundingRect.right - handBoundingRect.left) / 2) + "px";
    handElement.style.top = (mouseEvent.clientY - (handBoundingRect.bottom - handBoundingRect.top) / 2) + "px";
});

function distance(element1, element2) {

    const ele1Pos = getPos(element1);
    const ele2Pos = getPos(element2);

    return Math.sqrt(Math.pow(ele1Pos[0] - ele2Pos[0], 2) + Math.pow(ele1Pos[1] - ele2Pos[1], 2));
}

function getPos(element) {
    const eleBoundingRect = element.getBoundingClientRect();

    const x = (eleBoundingRect.right + eleBoundingRect.left) / 2
    const y = (eleBoundingRect.bottom + eleBoundingRect.top) / 2

    return [x, y];
}