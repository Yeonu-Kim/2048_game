import type { Cells, HistoryList } from '@/entities/gameType';
import { GameOverStatus, LocalStorageKey } from '@/entities/gameType';

type BodyProps = {
  cells?: Cells;
  history?: HistoryList;
  score?: number;
  highScore?: number;
  gameOver?: GameOverStatus;
};

export type LocalStorageRepository = {
  saveCell(_: Cells): void;
  saveHistory(_: HistoryList): void;
  saveScore(_: number): void;
  saveHighScore(_: number): void;
  saveGameOver(_: GameOverStatus): void;
  getDataInLocalStorage(): BodyProps;
  resetDataInLocalStorage(): void;
};

export const implLocalStorageRepository = (): LocalStorageRepository => ({
  saveCell: (cells: Cells) => {
    localStorage.setItem(LocalStorageKey.CELLS, JSON.stringify(cells));
  },
  saveHistory: (history: HistoryList) => {
    localStorage.setItem(LocalStorageKey.HISTORY, JSON.stringify(history));
  },
  saveScore: (score: number) => {
    localStorage.setItem(LocalStorageKey.SCORE, JSON.stringify(score));
  },
  saveHighScore: (highScore: number) => {
    localStorage.setItem(LocalStorageKey.HIGHSCORE, JSON.stringify(highScore));
  },
  saveGameOver: (gameOver: GameOverStatus) => {
    localStorage.setItem(LocalStorageKey.GAMEOVER, JSON.stringify(gameOver));
  },
  getDataInLocalStorage: (): BodyProps => {
    const storedCells = window.localStorage.getItem(LocalStorageKey.CELLS);
    const storedHistory = window.localStorage.getItem(LocalStorageKey.HISTORY);
    const storedScore = window.localStorage.getItem(LocalStorageKey.SCORE);
    const storedHighScore = window.localStorage.getItem(
      LocalStorageKey.HIGHSCORE,
    );
    const storedGameOver = window.localStorage.getItem(
      LocalStorageKey.GAMEOVER,
    );

    const data: BodyProps = {};

    if (storedCells !== null) {
      try {
        data[LocalStorageKey.CELLS] = JSON.parse(storedCells) as Cells;
      } catch (error) {
        // 잘못 저장된 item 삭제
        window.localStorage.removeItem(LocalStorageKey.CELLS);
      }
    }

    if (storedHistory !== null) {
      try {
        data[LocalStorageKey.HISTORY] = JSON.parse(
          storedHistory,
        ) as HistoryList;
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
  },
  resetDataInLocalStorage: () => {
    window.localStorage.clear();
  },
});
