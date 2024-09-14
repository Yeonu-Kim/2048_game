import { useCallback } from 'react';

const useMoveLeft = () => {
  const moveRowLeft = useCallback((row: (number | null)[]) => {
    const reduced = row.reduce(
      (acc: { lastCell: number | null; result: (number | null)[] }, cell) => {
        if (cell === null) {
          return acc;
        } else if (acc.lastCell === null) {
          return { ...acc, lastCell: cell };
        } else if (acc.lastCell === cell) {
          return { result: [...acc.result, cell * 2], lastCell: null };
        } else {
          return { result: [...acc.result, acc.lastCell], lastCell: cell };
        }
      },
      { lastCell: null, result: [] },
    );

    const result = [...reduced.result, reduced.lastCell];
    const resultRow = Array.from(
      { length: row.length },
      (_, i) => result[i] ?? null,
    );

    return {
      result: resultRow,
      isMoved: row.some((cell, i) => cell !== resultRow[i]),
    };
  }, []);

  const moveLeft = useCallback(
    (rotatedCells: (number | null)[][]) => {
      const movedRows = rotatedCells.map(moveRowLeft);
      const result = movedRows.map((movedRow) => movedRow.result);
      const isMoved = movedRows.some((movedRow) => movedRow.isMoved);
      return { result, isMoved };
    },
    [moveRowLeft],
  );

  return {
    moveLeft,
  };
};

export default useMoveLeft;

/*

*/
