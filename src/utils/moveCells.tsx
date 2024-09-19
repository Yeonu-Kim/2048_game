import moveLeft from './moveLeft';
import rotateMapCounterClockwise from './rotateCells';

const moveCells = (
  cells: (number | null)[][],
  rotateDirection: 0 | 90 | 180 | 270,
  revertDirection: 0 | 90 | 180 | 270,
) => {
  const rotatedCells = rotateMapCounterClockwise(cells, rotateDirection);
  const moveResult = moveLeft(rotatedCells);
  return {
    result: rotateMapCounterClockwise(moveResult.result, revertDirection),
    isMoved: moveResult.isMoved,
  };
};

export default moveCells;
