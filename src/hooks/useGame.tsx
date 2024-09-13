import { useCallback, useState } from 'react';

const useGame = () => {
  const [cells, setCells] = useState<(number | null)[][]>(
    Array<null>(4)
      .fill(null)
      .map(() => Array<null>(4).fill(null)),
  );

  const getEmptyCellsIndex = useCallback(() => {
    const emptyCells: [number, number][] = [];
    cells.forEach((row, rowIndex) => {
      row.forEach((value, colIndex) => {
        if (value === null) {
          emptyCells.push([rowIndex, colIndex]);
        }
      });
    });
    return emptyCells;
  }, [cells]);

  const addTwoRandomCells = useCallback(() => {
    const emptyCells = getEmptyCellsIndex();

    if (emptyCells.length < 16) return;

    const randomIndices = emptyCells
      .sort(() => Math.random() - 0.5) // 양수 나올 확률 vs 음수 나올 확률로 랜덤 정렬
      .slice(0, 2);

    const newCells = [...cells].map((row) => [...row]);
    randomIndices.forEach(([rowIndex, colIndex]) => {
      // 이 조건 좀 더 예쁘게 처리할 수 있는 방법이 있는지 확인
      if (newCells[rowIndex] !== undefined) {
        newCells[rowIndex][colIndex] = 2;
      }
    });

    setCells(newCells);
  }, [cells, getEmptyCellsIndex]);

  const rotateMapCounterClockwise = useCallback(
    (
      prevCells: (number | null)[][],
      degree: 0 | 90 | 180 | 270,
    ): (number | null)[][] => {
      const rowLength = prevCells.length;
      const columnLength = rowLength;

      switch (degree) {
        case 0:
          return prevCells;
        case 90:
          return Array.from({ length: columnLength }, (_, columnIndex) =>
            Array.from(
              { length: rowLength },
              (__, rowIndex) =>
                prevCells[rowIndex]?.[columnLength - columnIndex - 1] ?? null,
            ),
          );
        case 180:
          return Array.from({ length: rowLength }, (_, rowIndex) =>
            Array.from(
              { length: columnLength },
              (__, columnIndex) =>
                prevCells[rowLength - rowIndex - 1]?.[
                  columnLength - columnIndex - 1
                ] ?? null,
            ),
          );
        case 270:
          return Array.from({ length: columnLength }, (_, columnIndex) =>
            Array.from(
              { length: rowLength },
              (__, rowIndex) =>
                prevCells[rowLength - rowIndex - 1]?.[columnIndex] ?? null,
            ),
          );
        default:
          return prevCells;
      }
    },
    [],
  );

  const moveRowLeft = useCallback(
    (
      row: (number | null)[],
    ): { result: (number | null)[]; isMoved: boolean } => {
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
        isMoved: row.some((cell, i) => cell !== result[i]),
      };
    },
    [],
  );

  const moveLeft = useCallback(
    (
      rotatedCells: (number | null)[][],
    ): { result: (number | null)[][]; isMoved: boolean } => {
      const movedRows = rotatedCells.map(moveRowLeft);
      const result = movedRows.map((movedRow) => movedRow.result);
      const isMoved = movedRows.some((movedRow) => movedRow.isMoved);
      return { result, isMoved };
    },
    [moveRowLeft],
  );

  const moveCells = useCallback(
    (
      rotateDirection: 0 | 90 | 180 | 270,
      revertDirection: 0 | 90 | 180 | 270,
    ) => {
      const rotatedCells = rotateMapCounterClockwise(cells, rotateDirection);
      const moveResult = moveLeft(rotatedCells);
      setCells(rotateMapCounterClockwise(moveResult.result, revertDirection));
    },
    [rotateMapCounterClockwise, moveLeft, cells],
  );

  return {
    cells,
    addTwoRandomCells,
    moveCells,
  };
};

export default useGame;
