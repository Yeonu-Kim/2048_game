import type { Cells, History } from '../entities/gameType.ts';
import { GameOverStatus, LocalStorageKey } from '../entities/gameType.ts';

type BodyProps = {
  cells?: Cells;
  history?: History;
  score?: number;
  highScore?: number;
  gameOver?: GameOverStatus;
};

export const saveLocalStorage = (body: BodyProps) => {
  if (body.cells !== undefined) {
    localStorage.setItem(LocalStorageKey.CELLS, JSON.stringify(body.cells));
  }
  if (body.history !== undefined) {
    localStorage.setItem(LocalStorageKey.HISTORY, JSON.stringify(body.history));
  }
  if (body.score !== undefined) {
    localStorage.setItem(LocalStorageKey.SCORE, JSON.stringify(body.score));
  }
  if (body.highScore !== undefined) {
    localStorage.setItem(
      LocalStorageKey.HIGHSCORE,
      JSON.stringify(body.highScore),
    );
  }
  if (body.gameOver !== undefined) {
    localStorage.setItem(
      LocalStorageKey.GAMEOVER,
      JSON.stringify(body.gameOver),
    );
  }
};

export const getLocalData = (): BodyProps => {
  const storedCells = window.localStorage.getItem(LocalStorageKey.CELLS);
  const storedHistory = window.localStorage.getItem(LocalStorageKey.HISTORY);
  const storedScore = window.localStorage.getItem(LocalStorageKey.SCORE);
  const storedHighScore = window.localStorage.getItem(
    LocalStorageKey.HIGHSCORE,
  );
  const storedGameOver = window.localStorage.getItem(LocalStorageKey.GAMEOVER);

  const data: BodyProps = {};

  if (storedCells !== null) {
    try {
      data[LocalStorageKey.CELLS] = JSON.parse(storedCells) as Cells;
    } catch {
      // 잘못 저장된 item 삭제
      window.localStorage.removeItem(LocalStorageKey.CELLS);
    }
  }

  if (storedHistory !== null) {
    try {
      data[LocalStorageKey.HISTORY] = JSON.parse(storedHistory) as History;
    } catch {
      // 잘못 저장된 item 삭제
      window.localStorage.removeItem(LocalStorageKey.HISTORY);
    }
  }

  if (storedScore !== null) {
    try {
      data[LocalStorageKey.SCORE] = JSON.parse(storedScore) as number;
    } catch {
      // 잘못 저장된 item 삭제
      window.localStorage.removeItem(LocalStorageKey.SCORE);
    }
  }

  if (storedHighScore !== null) {
    try {
      data[LocalStorageKey.HIGHSCORE] = JSON.parse(storedHighScore) as number;
    } catch {
      // 잘못 저장된 item 삭제
      window.localStorage.removeItem(LocalStorageKey.HIGHSCORE);
    }
  }

  if (storedGameOver !== null) {
    try {
      data[LocalStorageKey.GAMEOVER] = JSON.parse(
        storedGameOver,
      ) as GameOverStatus;
    } catch {
      // 잘못 저장된 item 삭제
      window.localStorage.removeItem(LocalStorageKey.GAMEOVER);
    }
  }

  return data;
};

export const resetLocalStorage = () => {
  window.localStorage.clear();
};
