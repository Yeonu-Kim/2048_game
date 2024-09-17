import { useCallback, useState } from 'react';

import useGameBoard from './useGameBoard';
import useMoveLeft from './useMoveLeft';
import useRotateCells from './useRotateCells';

export enum GameOverStatus {
  Success = 'success',
  Fail = 'fail',
  None = 'none',
}

const useGame = () => {
  const {
    isMoved,
    cells,
    history,
    score,
    highScore,
    getEmptyCellsIndex,
    setCells,
    setIsMoved,
    addTwoRandomCells,
    saveCellsHistory,
    undo,
    getScore,
    updateHighScore,
  } = useGameBoard();
  const { rotateMapCounterClockwise } = useRotateCells();
  const { moveLeft } = useMoveLeft();

  const [gameOver, setGameOver] = useState<GameOverStatus>(GameOverStatus.None);

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

  const checkCanMove = useCallback(
    (newCells: (number | null)[][]) => {
      const rotateDirections: (0 | 90 | 180 | 270)[] = [0, 90, 180, 270];
      return rotateDirections.some((rotateDirection) => {
        const rotatedCells = rotateMapCounterClockwise(
          newCells,
          rotateDirection,
        );
        const moveResult = moveLeft(rotatedCells);

        return moveResult.isMoved;
      });
    },
    [moveLeft, rotateMapCounterClockwise],
  );

  const is128Exist = useCallback((newCells: (number | null)[][]) => {
    return newCells.some((row) => row.includes(128));
  }, []);

  const checkNextTurn = useCallback(() => {
    const emptyCells = getEmptyCellsIndex();

    if (emptyCells.length === 0) return;

    // 새로운 셀 생성
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    // 이 조건 깔끔하게 처리할 수 있는 방법 확인
    if (emptyCells[randomIndex] !== undefined) {
      const [rowIndex, colIndex] = emptyCells[randomIndex];

      const newCells = cells.map((row) => [...row]);

      if (newCells[rowIndex] !== undefined) {
        newCells[rowIndex][colIndex] = 2;
      }
      // 점수 연산
      const newScore = getScore(newCells);
      updateHighScore(newScore);

      // 다음 턴 진행 가능한지 확인
      if (is128Exist(newCells)) {
        setGameOver(GameOverStatus.Success);
      }
      if (!checkCanMove(newCells)) {
        setGameOver(GameOverStatus.Fail);
      }

      setCells(newCells);
      saveCellsHistory(newCells);
    }

    setIsMoved(false);
  }, [
    cells,
    getEmptyCellsIndex,
    checkCanMove,
    is128Exist,
    setCells,
    setIsMoved,
    saveCellsHistory,
    getScore,
    updateHighScore,
  ]);

  return {
    isMoved,
    cells,
    gameOver,
    history,
    score,
    highScore,
    addTwoRandomCells,
    checkNextTurn,
    moveCells,
    checkCanMove,
    is128Exist,
    undo,
    getScore,
    updateHighScore,
  };
};

export default useGame;
