import { GameOverStatus } from '../components/types/GameType';

type bodyProps = {
  cells?: (number | null)[][];
  history?: (number | null)[][][];
  score?: number;
  highScore?: number;
  gameOver?: GameOverStatus;
};

export const saveLocalStorage = (body: bodyProps) => {
  if (body.cells !== undefined) {
    localStorage.setItem('cells', JSON.stringify(body.cells));
  }
  if (body.history !== undefined) {
    localStorage.setItem('history', JSON.stringify(body.history));
  }
  if (body.score !== undefined) {
    localStorage.setItem('score', JSON.stringify(body.score));
  }
  if (body.highScore !== undefined) {
    localStorage.setItem('highScore', JSON.stringify(body.highScore));
  }
  if (body.gameOver !== undefined) {
    localStorage.setItem('gameOver', JSON.stringify(body.gameOver));
  }
};

export const getLocalData = (): bodyProps => {
  const storedCells = window.localStorage.getItem('cells');
  const storedHistory = window.localStorage.getItem('history');
  const storedScore = window.localStorage.getItem('score');
  const storedHighScore = window.localStorage.getItem('highScore');
  const storedGameOver = window.localStorage.getItem('gameOver');

  const data: bodyProps = {};

  if (storedCells !== null) {
    try {
      data['cells'] = JSON.parse(storedCells) as (number | null)[][];
    } catch {
      // 잘못 저장된 item 삭제
      window.localStorage.removeItem('cells');
    }
  }

  if (storedHistory !== null) {
    try {
      data['history'] = JSON.parse(storedHistory) as (number | null)[][][];
    } catch {
      // 잘못 저장된 item 삭제
      window.localStorage.removeItem('history');
    }
  }

  if (storedScore !== null) {
    try {
      data['score'] = JSON.parse(storedScore) as number;
    } catch {
      // 잘못 저장된 item 삭제
      window.localStorage.removeItem('score');
    }
  }

  if (storedHighScore !== null) {
    try {
      data['highScore'] = JSON.parse(storedHighScore) as number;
    } catch {
      // 잘못 저장된 item 삭제
      window.localStorage.removeItem('highScore');
    }
  }

  if (storedGameOver !== null) {
    try {
      data['gameOver'] = JSON.parse(storedGameOver) as GameOverStatus;
    } catch {
      // 잘못 저장된 item 삭제
      window.localStorage.removeItem('gameOver');
    }
  }

  return data;
};

export const resetLocalStorage = () => {
  window.localStorage.clear();
};
