function snapPosition1D(staticStart: number, staticLength: number, movingStart: number, movingLength: number): number {

    const movingMidPoint = movingStart - movingLength / 2;
    const staticMidPoint = staticStart - staticLength / 2;

    if (movingMidPoint < staticMidPoint) {
        return staticStart - staticLength;
    }
    return staticStart + movingLength;
}

type Vec2 = { x: number, y: number };
type Box = { pos: Vec2, length: Vec2 };

function snapPosition2D(staticBox: Box, movingBox: Box): Vec2 {
    const snappedPositionX = snapPosition1D(staticBox.pos.x, staticBox.length.x, movingBox.pos.x, movingBox.length.x);
    const snappedPositionY = snapPosition1D(staticBox.pos.y, staticBox.length.y, movingBox.pos.y, movingBox.length.y);

    return { x: snappedPositionX, y: snappedPositionY };
}