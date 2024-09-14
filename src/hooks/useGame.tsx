import { useCallback } from 'react';

import useGameBoard from './useGameBoard';
import useMoveLeft from './useMoveLeft';
import useRotateCells from './useRotateCells';

const useGame = () => {
  const {
    isMoved,
    cells,
    setCells,
    setIsMoved,
    addTwoRandomCells,
    addOneRandomCell,
  } = useGameBoard();
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
      setIsMoved(moveResult.isMoved);
    },
    [cells, moveLeft, rotateMapCounterClockwise, setCells, setIsMoved],
  );

  return {
    isMoved,
    cells,
    addTwoRandomCells,
    addOneRandomCell,
    moveCells,
  };
};

export default useGame;
