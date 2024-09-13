import { useCallback } from 'react';

import useGameBoard from './useGameBoard';
import useMoveLeft from './useMoveLeft';
import useRotateCells from './useRotateCells';

const useGame = () => {
  const { cells, setCells, addTwoRandomCells } = useGameBoard();
  const { rotateMapCounterClockwise } = useRotateCells();
  const { moveLeft } = useMoveLeft();

  const moveCells = useCallback(
    (
      rotateDirection: 0 | 90 | 180 | 270,
      revertDirection: 0 | 90 | 180 | 270,
    ) => {
      const rotatedCells = rotateMapCounterClockwise(cells, rotateDirection);
      const moveResult = moveLeft(rotatedCells);
      setCells(rotateMapCounterClockwise(moveResult.result, revertDirection));
    },
    [cells, rotateMapCounterClockwise, moveLeft, setCells],
  );

  return {
    cells,
    addTwoRandomCells,
    moveCells,
  };
};

export default useGame;
