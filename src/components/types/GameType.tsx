// export type Cell = number | null;
// export type Cells = Cell[][];
// export type Direction = 'up' | 'left' | 'right' | 'down';
// export type RotateDegree = 0 | 90 | 180 | 270;
// export type DirectionDegreeMap = Record<Direction, RotateDegree>;
// export type MoveResult = { result: Cells; isMoved: boolean };
export enum GameOverStatus {
  Success = 'success',
  Fail = 'fail',
  None = 'none',
}
