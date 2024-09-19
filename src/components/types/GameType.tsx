export type CellType = number | null;
export type CellsType = CellType[][];
export type HistoryType = CellsType[];
export type DirectionType = 'up' | 'left' | 'right' | 'down';
export type RotateDegreeType = 0 | 90 | 180 | 270;
export enum GameOverStatus {
  Success = 'success',
  Fail = 'fail',
  None = 'none',
}
