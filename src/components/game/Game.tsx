import { useCallback, useEffect } from 'react';

import { GameOverStatus } from '../../entities/gameType.ts';
import { useGame } from '../../hooks/useGame.tsx';
import { saveLocalStorage } from '../../utils/localStorageUtils.ts';
import { Header } from '../Header.tsx';
import { Board } from './Board.tsx';

export const Game = () => {
  const {
    cells,
    mergedCells,
    score,
    highScore,
    history,
    gameOver,
    checkTurn,
    checkReload,
    checkUndo,
    checkInit,
  } = useGame();

  const getKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (gameOver === GameOverStatus.NONE) {
        switch (event.code) {
          case 'ArrowUp':
            event.preventDefault();
            checkTurn('up');
            break;

          case 'ArrowDown':
            event.preventDefault();
            checkTurn('down');
            break;

          case 'ArrowLeft':
            event.preventDefault();
            checkTurn('left');
            break;

          case 'ArrowRight':
            event.preventDefault();
            checkTurn('right');
            break;
        }
      }
    },
    [gameOver, checkTurn],
  );

  // 컴포넌트 렌더링 시 실행
  useEffect(checkReload, [checkReload]);

  // 키 누르면 게임 실행
  useEffect(() => {
    window.addEventListener('keydown', getKeyDown);

    return () => {
      window.removeEventListener('keydown', getKeyDown);
    };
  }, [getKeyDown]);

  useEffect(() => {
    saveLocalStorage({ highScore, cells, history, score, gameOver });
  }, [highScore, cells, history, score, gameOver]);

  return (
    <>
      <Header
        score={score}
        highScore={highScore}
        checkUndo={checkUndo}
        checkInit={checkInit}
      />
      <Board
        cells={cells}
        mergedCells={mergedCells}
        gameOver={gameOver}
        checkInit={checkInit}
      />
    </>
  );
};
