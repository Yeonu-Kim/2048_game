import moveLeft from './moveLeft';
import rotateMapCounterClockwise from './rotateCells';

const checkCanMove = (newCells: (number | null)[][]) => {
  const rotateDirections: (0 | 90 | 180 | 270)[] = [0, 90, 180, 270];
  return rotateDirections.some((rotateDirection) => {
    const rotatedCells = rotateMapCounterClockwise(newCells, rotateDirection);
    const moveResult = moveLeft(rotatedCells);

    return moveResult.isMoved;
  });
};


export default checkCanMove;
