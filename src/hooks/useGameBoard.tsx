import { useCallback, useState } from 'react';

const useGameBoard = () => {
  const [cells, setCells] = useState<(number | null)[][]>(
    Array<null>(4)
      .fill(null)
      .map(() => Array<null>(4).fill(null)),
  );
  const [isMoved, setIsMoved] = useState<boolean>(false);

  const getEmptyCellsIndex = useCallback((): [number, number][] => {
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
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);

    const newCells = [...cells].map((row) => [...row]);
    randomIndices.forEach(([rowIndex, colIndex]) => {
      // 이 조건 깔끔하게 처리할 수 있는 방법 확인
      if (newCells[rowIndex] !== undefined) {
        newCells[rowIndex][colIndex] = 2;
      }
    });

    setCells(newCells);
  }, [cells, getEmptyCellsIndex]);

  const addOneRandomCell = useCallback(() => {
    const emptyCells = getEmptyCellsIndex();

    if (emptyCells.length === 0) return;

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    // 이 조건 깔끔하게 처리할 수 있는 방법 확인
    if (emptyCells[randomIndex] !== undefined) {
      const [rowIndex, colIndex] = emptyCells[randomIndex];

      const newCells = cells.map((row) => [...row]);

      if (newCells[rowIndex] !== undefined) {
        newCells[rowIndex][colIndex] = 2;
      }
      setCells(newCells);
    }

    setIsMoved(false);
  }, [getEmptyCellsIndex, cells]);

  return {
    cells,
    isMoved,
    setCells,
    setIsMoved,
    addOneRandomCell,
    addTwoRandomCells,
  };
};

export default useGameBoard;
