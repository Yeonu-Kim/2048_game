import type { CellsType, CellType } from '../components/types/GameType';

const moveRowLeft = (row: CellType[]) => {
  const reduced = row.reduce(
    (
      acc: { lastCell: CellType; result: CellType[]; addScore: number },
      cell,
    ) => {
      if (cell === null) {
        return acc;
      } else if (acc.lastCell === null) {
        return { ...acc, lastCell: cell };
      } else if (acc.lastCell === cell) {
        return {
          result: [...acc.result, cell * 2],
          lastCell: null,
          addScore: acc.addScore + cell * 2,
        };
      } else {
        return {
          ...acc,
          result: [...acc.result, acc.lastCell],
          lastCell: cell,
        };
      }
    },
    { lastCell: null, result: [], addScore: 0 },
  );

  const result = [...reduced.result, reduced.lastCell];
  const resultRow = Array.from(
    { length: row.length },
    (_, i) => result[i] ?? null,
  );

  return {
    result: resultRow,
    isMoved: row.some((cell, i) => cell !== resultRow[i]),
    addScore: reduced.addScore,
  };
};

const moveLeft = (rotatedCells: CellsType) => {
  const movedRows = rotatedCells.map(moveRowLeft);
  const result = movedRows.map((movedRow) => movedRow.result);
  const isMoved = movedRows.some((movedRow) => movedRow.isMoved);
  const addScore = movedRows.reduce(
    (acc, movedRow) => acc + movedRow.addScore,
    0,
  );
  return { result, isMoved, addScore };
};

export default moveLeft;
