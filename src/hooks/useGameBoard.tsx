import { useCallback, useEffect, useState } from 'react';

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

    if (window.localStorage.getItem('cells') !== null) return;

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

    // 로컬 스토리지에 저장
    window.localStorage.setItem('cells', JSON.stringify(newCells));

    setCells(newCells);
    setHistory([newCells]);
  }, [cells, getEmptyCellsIndex]);

  const getScore = useCallback((newCells: (number | null)[][]) => {
    const newScore = newCells.reduce(
      (accRow, row) =>
        accRow +
        row.reduce<number>((accCell, cell) => accCell + (cell ?? 0), 0),
      0,
    );

    setScore(newScore);
    window.localStorage.setItem('score', `${newScore}`);

    return newScore;
  }, []);

  const updateHighScore = useCallback(
    (newScore: number) => {
      setHighScore((prevHighScore) => {
        return newScore > prevHighScore ? newScore : prevHighScore;
      });
      window.localStorage.setItem(
        'highScore',
        `${newScore > highScore ? newScore : highScore}`,
      );
    },
    [highScore],
  );

  const undo = useCallback(() => {
    setHistory((prevHistory: (number | null)[][][]) => {
      if (prevHistory.length > 1) {
        const newHistory = prevHistory.slice(0, -1);
        const previousCells = newHistory[newHistory.length - 1] ?? null;

        if (previousCells !== null) {
          setCells(previousCells);
          getScore(previousCells);
        }

        // 로컬 스토리지에 undo 결과 저장
        window.localStorage.setItem('cells', JSON.stringify(previousCells));
        window.localStorage.setItem('history', JSON.stringify(history));

        return newHistory;
      }

      return prevHistory;
    });
  }, [history, getScore]);

  const loadInitialData = useCallback(() => {
    const storedCells = window.localStorage.getItem('cells');
    const storedHistory = window.localStorage.getItem('history');
    const storedScore = window.localStorage.getItem('score');
    const storedHighScore = window.localStorage.getItem('highScore');

    // gpt의 힘을 빌린 type 정리...
    // BrowserStorage를 사용하여 객체로 관리하도록 변경
    // https://blog.banksalad.com/tech/typescript-local-storage/
    if (storedCells !== null) {
      try {
        const parsedCells = JSON.parse(storedCells) as unknown;
        if (
          Array.isArray(parsedCells) &&
          parsedCells.every(
            (row) =>
              Array.isArray(row) &&
              row.every((cell) => cell === null || typeof cell === 'number'),
          )
        ) {
          setCells(parsedCells as (number | null)[][]);
        }
      } catch (e) {
        console.error('Error parsing cells from localStorage', e);
      }
    }

    if (storedHistory !== null) {
      try {
        const parsedHistory = JSON.parse(storedHistory) as unknown;
        if (
          Array.isArray(parsedHistory) &&
          parsedHistory.every((historyEntry) => Array.isArray(historyEntry))
        ) {
          setHistory(parsedHistory as (number | null)[][][]);
        }
      } catch (e) {
        console.error('Error parsing history from localStorage', e);
      }
    }

    if (storedScore !== null) {
      const parsedScore = parseInt(storedScore, 10);
      if (!isNaN(parsedScore)) {
        setScore(parsedScore);
      }
    }

    if (storedHighScore !== null) {
      const parsedHighScore = parseInt(storedHighScore, 10);
      if (!isNaN(parsedHighScore)) {
        setHighScore(parsedHighScore);
      }
    }
  }, [setCells, setHistory, setScore, setHighScore]);

  const initGameBoard = () => {
    setCells(
      Array<null>(4)
        .fill(null)
        .map(() => Array<null>(4).fill(null)),
    );
    setScore(4);
    setHistory([]);

    window.localStorage.removeItem('cells');
    window.localStorage.setItem('score', '4');
    window.localStorage.setItem('history', '[]');
  };

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

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
    initGameBoard,
  };
};

export default useGameBoard;
