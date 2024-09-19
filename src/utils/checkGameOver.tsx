import moveLeft from './moveLeft';
import rotateMapCounterClockwise from './rotateCells';

export const checkCanMove = (newCells: (number | null)[][]) => {
  const rotateDirections: (0 | 90 | 180 | 270)[] = [0, 90, 180, 270];
  return rotateDirections.some((rotateDirection) => {
    const rotatedCells = rotateMapCounterClockwise(newCells, rotateDirection);
    const moveResult = moveLeft(rotatedCells);

    return moveResult.isMoved;
  });
};

export const is128Exist = (newCells: (number | null)[][]) => {
  return newCells.some((row) => row.includes(128));
};
