import { useCallback, useState } from 'react';

import type {
  Cells,
  Direction,
  History,
  HistoryList,
} from '../entities/gameType.ts';
import { GameOverStatus } from '../entities/gameType.ts';
import { getHighScore } from '../usecases/scoreUtils.ts';
import { undo } from '../usecases/undoUtils.ts';
import {
  addOneRandomCell,
  addTwoRandomCells,
  checkCanMove,
  getEmptyCellsIndex,
  is128Exist,
  moveCells,
} from '../utils/cellUtils.ts';
import {
  getLocalData,
  resetLocalStorage,
  saveLocalStorage,
} from '../utils/localStorageUtils.ts';

export const useGame = () => {
  const [cells, setCells] = useState<Cells>(
    Array<null>(4)
      .fill(null)
      .map(() => Array<null>(4).fill(null)),
  );
  const [history, setHistory] = useState<HistoryList>([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState<GameOverStatus>(GameOverStatus.NONE);

  const saveCellsHistory = useCallback((newHistory: History) => {
    setHistory((prevHistory) => [...prevHistory, structuredClone(newHistory)]);
  }, []);

  const checkTurn = useCallback(
    (direction: Direction) => {
      // 셀 이동
      const moveResult = moveCells(cells, direction);

      const movedCells = moveResult.result;
      const newIsMoved = moveResult.isMoved;
      const addScore = moveResult.addScore;

      if (newIsMoved) {
        const newCells = addOneRandomCell(movedCells);

        // 점수 연산
        const newScore = score + addScore;
        const newHighScore = getHighScore(newScore, highScore);

        // 다음 턴 진행 가능한지 확인
        if (is128Exist(newCells)) {
          setGameOver(GameOverStatus.SUCCESS);
        } else if (!checkCanMove(newCells)) {
          setGameOver(GameOverStatus.FAIL);
        }

        setCells(newCells);
        saveCellsHistory({ cells: newCells, score: newScore });
        setScore(newScore);
        setHighScore(newHighScore);
      }
    },
    [score, cells, highScore, saveCellsHistory],
  );

  const checkUndo = () => {
    const undoResult = undo(history);

    if (undoResult.currentCell !== undefined) {
      setCells(undoResult.currentCell);
      // 점수 변경
      const newScore = undoResult.currentScore ?? 0;
      setScore(newScore);
    }
    setHistory(undoResult.history);
  };

  const checkReload = useCallback(() => {
    const data = getLocalData();

    const emptyCells = Array<null>(4)
      .fill(null)
      .map(() => Array<null>(4).fill(null));
    const initCells = addTwoRandomCells(emptyCells);

    // 로컬스토리지에 데이터가 있으면 해당 데이터로 불러오기
    if (
      data.cells !== undefined &&
      getEmptyCellsIndex(data.cells).length === 16
    ) {
      setCells(initCells);
    } else {
      setCells(data.cells ?? initCells);
    }

    setHistory(data.history ?? []);
    setScore(data.score ?? 0);
    setHighScore(data.highScore ?? 0);
    setGameOver(data.gameOver ?? GameOverStatus.NONE);
  }, []);

  const checkInit = () => {
    resetLocalStorage();

    const emptyCells = Array<null>(4)
      .fill(null)
      .map(() => Array<null>(4).fill(null));
    const initCells = addTwoRandomCells(emptyCells);

    setCells(initCells);
    setScore(0);
    setHistory([{ cells: initCells, score: 0 }]);
    setGameOver(GameOverStatus.NONE);

    // highScore는 다시 로컬스토리지에 저장
    saveLocalStorage({
      highScore: highScore,
    });
  };

  return {
    cells,
    score,
    highScore,
    history,
    gameOver,
    checkTurn,
    checkUndo,
    checkReload,
    checkInit,
  };
};
