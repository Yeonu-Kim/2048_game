import { useCallback, useState } from 'react';

const useGameBoard = () => {
  const [cells, setCells] = useState<(number | null)[][]>(
    Array<null>(4)
      .fill(null)
      .map(() => Array<null>(4).fill(null)),
  );
  const [isMoved, setIsMoved] = useState<boolean>(false);
  const [history, setHistory] = useState<(number | null)[][][]>([]);
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);

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

  const getScore = useCallback((newCells: (number | null)[][]) => {
    const newScore = newCells.reduce(
      (accRow, row) =>
        accRow +
        row.reduce<number>((accCell, cell) => accCell + (cell ?? 0), 0),
      0,
    );

    setScore(newScore);

    return newScore;
  }, []);

  const updateHighScore = useCallback((newScore: number) => {
    setHighScore((prevHighScore) => {
      return newScore > prevHighScore ? newScore : prevHighScore;
    });
  }, []);

  return {
    cells,
    isMoved,
    history,
    score,
    highScore,
    getEmptyCellsIndex,
    setCells,
    setIsMoved,
    addTwoRandomCells,
    saveCellsHistory,
    undo,
    getScore,
    updateHighScore,
  };
};

export default useGameBoard;
