import { useCallback, useState } from 'react';

const useGameBoard = () => {
  const [cells, setCells] = useState<(number | null)[][]>(
    Array<null>(4)
      .fill(null)
      .map(() => Array<null>(4).fill(null)),
  );
  const [isMoved, setIsMoved] = useState<boolean>(false);
  const [history, setHistory] = useState<(number | null)[][][]>([]);

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

  const saveCellsHistory = useCallback((newCells: (number | null)[][]) => {
    setHistory((prevHistory: (number | null)[][][]) => [
      ...prevHistory,
      structuredClone(newCells),
    ]);
  }, []);

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
    setHistory([newCells]);
  }, [cells, getEmptyCellsIndex]);

  const undo = useCallback(() => {
    setHistory((prevHistory: (number | null)[][][]) => {
      console.error(prevHistory);
      if (prevHistory.length > 1) {
        const newHistory = prevHistory.slice(0, -1);
        const previousCells = newHistory[newHistory.length - 1] ?? null;

        if (previousCells !== null) {
          setCells(previousCells);
        }

        return newHistory;
      }

      return prevHistory;
    });
  }, []);

  return {
    cells,
    isMoved,
    history,
    getEmptyCellsIndex,
    setCells,
    setIsMoved,
    addTwoRandomCells,
    saveCellsHistory,
    undo,
  };
};

export default useGameBoard;
