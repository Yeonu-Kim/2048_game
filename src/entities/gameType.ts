export type CellType = number | null;
export type Cells = CellType[][];
export type History = Cells[];
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
