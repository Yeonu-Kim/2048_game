import type { CellsType, RotateDegreeType } from '../components/types/GameType';
import moveLeft from './moveLeft';
import rotateMapCounterClockwise from './rotateCells';

const moveCells = (
  cells: CellsType,
  rotateDirection: RotateDegreeType,
  revertDirection: RotateDegreeType,
) => {
  const rotatedCells = rotateMapCounterClockwise(cells, rotateDirection);
  const moveResult = moveLeft(rotatedCells);
  return {
    result: rotateMapCounterClockwise(moveResult.result, revertDirection),
    isMoved: moveResult.isMoved,
  };
};

export default moveCells;
