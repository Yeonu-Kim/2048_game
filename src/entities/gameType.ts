export type CellType = {
  id: string;
  value: number;
  row: number | null;
  col: number | null;
  mergedToId: string | null;
} | null;
export type Cells = CellType[][];
export type History = { cells: Cells; score: number };
export type HistoryList = History[];
export type Direction = 'up' | 'left' | 'right' | 'down';
export type RotateDegree = 0 | 90 | 180 | 270;
export enum GameOverStatus {
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
  NONE = 'NONE',
}
export enum LocalStorageKey {
  CELLS = 'cells',
  HISTORY = 'history',
  SCORE = 'score',
  HIGHSCORE = 'highScore',
  GAMEOVER = 'gameOver',
}
