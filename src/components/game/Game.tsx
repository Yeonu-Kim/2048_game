import { useCallback, useEffect } from 'react';

import useGame from '../../hooks/useGame.tsx';
import Board from './Board.tsx';

interface DirectionDegreeProps {
  up: 0 | 90 | 180 | 270;
  right: 0 | 90 | 180 | 270;
  down: 0 | 90 | 180 | 270;
  left: 0 | 90 | 180 | 270;
}

const Game = () => {
  const { cells, addTwoRandomCells, moveCells } = useGame();

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
      console.error(event.code);
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
    },
    [moveCellsByDirection],
  );

  useEffect(addTwoRandomCells, [addTwoRandomCells]);
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return <Board cells={cells} />;
};

export default Game;
