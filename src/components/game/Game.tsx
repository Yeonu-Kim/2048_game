import { useCallback, useEffect } from 'react';

import useGame from '../../hooks/useGame.tsx';
import Header from '../Header.tsx';
import { GameOverStatus } from '../types/GameType.tsx';
import Board from './Board.tsx';

const Game = () => {
  const {
    cells,
    score,
    highScore,
    gameOver,
    checkTurn,
    checkReload,
    checkUndo,
    checkInit,
  } = useGame();

  const getKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (gameOver == GameOverStatus.None) {
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

  return (
    <>
      <Header
        score={score}
        highScore={highScore}
        checkUndo={checkUndo}
        checkInit={checkInit}
      />
      <Board cells={cells} gameOver={gameOver} checkInit={checkInit} />
    </>
  );
};

export default Game;
