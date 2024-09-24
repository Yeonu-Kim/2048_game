import type { Cells } from '../entities/gameType.ts';

export const getScore = (newCells: Cells) => {
  const newScore = newCells.reduce(
    (accRow, row) =>
      accRow + row.reduce<number>((accCell, cell) => accCell + (cell ?? 0), 0),
    0,
  );

  return newScore;
};

export const getHighScore = (newScore: number, prevHighScore: number) => {
  return newScore > prevHighScore ? newScore : prevHighScore;
};
