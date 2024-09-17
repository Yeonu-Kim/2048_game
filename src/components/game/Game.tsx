import { useCallback, useEffect } from 'react';

import { GameOverStatus } from '../../hooks/useGame.tsx';
import useGame from '../../hooks/useGame.tsx';
import Header from '../Header.tsx';
import Board from './Board.tsx';

interface DirectionDegreeProps {
  up: 0 | 90 | 180 | 270;
  right: 0 | 90 | 180 | 270;
  down: 0 | 90 | 180 | 270;
  left: 0 | 90 | 180 | 270;
}

const Game = () => {
  const {
    isMoved,
    cells,
    gameOver,
    score,
    highScore,
    addTwoRandomCells,
    checkNextTurn,
    moveCells,
    undo,
    initGameBoard,
  } = useGame();

  const moveCellsByDirection = useCallback(
    (direction: 'up' | 'down' | 'left' | 'right') => {
      const rotateDegree: DirectionDegreeProps = {
        up: 90,
        right: 180,
        down: 270,
        left: 0,
      };

      const revertDegree: DirectionDegreeProps = {
        up: 270,
        right: 180,
        down: 90,
        left: 0,
      };

      moveCells(rotateDegree[direction], revertDegree[direction]);
    },
    [moveCells],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      event.preventDefault();
      if (gameOver === GameOverStatus.None) {
        switch (event.code) {
          case 'ArrowUp':
            moveCellsByDirection('up');
            break;
          case 'ArrowDown':
            moveCellsByDirection('down');
            break;
          case 'ArrowLeft':
            moveCellsByDirection('left');
            break;
          case 'ArrowRight':
            moveCellsByDirection('right');
            break;
        }
      }
    },
    [moveCellsByDirection, gameOver],
  );

  const handleIsMoved = useCallback(() => {
    if (isMoved) {
      checkNextTurn();
    }
  }, [isMoved, checkNextTurn]);

  useEffect(addTwoRandomCells, [addTwoRandomCells]);

  useEffect(handleIsMoved, [handleIsMoved]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMoved, handleKeyDown]);

  return (
    <>
      <Header
        undo={undo}
        initGameBoard={initGameBoard}
        score={score}
        highScore={highScore}
      />
      <Board cells={cells} gameOver={gameOver} />
    </>
  );
};

export default Game;
