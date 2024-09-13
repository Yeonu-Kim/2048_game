import { useCallback, useEffect, useState } from 'react';

import Board from './Board.tsx';

const Game = () => {
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
    console.error('renderd!');

    if (emptyCells.length < 16) return;

    const randomIndices = emptyCells
      .sort(() => Math.random() - 0.5)
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

  useEffect(addTwoRandomCells, [addTwoRandomCells]);

  return <Board cells={cells} />;
};

export default Game;
