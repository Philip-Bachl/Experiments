function getCorrectionDelta(staticStart: number, staticLength: number, movingStart: number, movingLength: number): number {

    const movingMidPoint = movingStart - movingLength / 2;
    const staticMidPoint = staticStart - staticLength / 2;

    if (movingMidPoint < staticMidPoint) {
        return staticStart - staticLength - movingStart;
    }
    return staticStart + movingLength - movingStart;
}

class Vec2 {
    constructor(public x: number, public y: number) { }
}

class Box {
    constructor(public pos: Vec2, public length: Vec2) { }
}

function snapPosition2D(staticBox: Box, movingBox: Box): Vec2 {
    const deltaX = getCorrectionDelta(staticBox.pos.x, staticBox.length.x, movingBox.pos.x, movingBox.length.x);
    const deltaY = getCorrectionDelta(staticBox.pos.y, staticBox.length.y, movingBox.pos.y, movingBox.length.y);

    if (Math.abs(deltaX) < Math.abs(deltaY)) {
        return { x: deltaX + movingBox.pos.x, y: movingBox.pos.y };
    }

    return { x: movingBox.pos.x, y: deltaY + movingBox.pos.y };
}

function areColliding(box1: Box, box2: Box): boolean {
    if (box1.pos.x >= box2.pos.x && box1.pos.x <= box2.pos.x + box2.length.x || box2.pos.x >= box1.pos.x && box2.pos.x <= box1.pos.x + box1.length.x) {
        if (box1.pos.y >= box2.pos.y && box1.pos.y <= box2.pos.y + box2.length.y || box2.pos.y >= box1.pos.y && box2.pos.y <= box1.pos.y + box1.length.y) {
            return true;
        }
    }

    return false;
}