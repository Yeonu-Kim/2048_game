import { useCallback, useState } from 'react';

import type {
  Cells,
  CellType,
  Direction,
  History,
  HistoryList,
} from '../entities/gameType.ts';
import { GameOverStatus } from '../entities/gameType.ts';
import type { Services } from '../entities/Service.ts';

export const useGame = ({ services }: { services: Services }) => {
  const [cells, setCells] = useState<Cells>(
    Array<null>(4)
      .fill(null)
      .map(() => Array<null>(4).fill(null)),
  );
  const [mergedCells, setMergedCells] = useState<CellType[]>([]);
  const [history, setHistory] = useState<HistoryList>([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState<GameOverStatus>(GameOverStatus.NONE);

  const { cellService, scoreService, undoService } = services;

  const saveCellsHistory = useCallback((newHistory: History) => {
    setHistory((prevHistory) => [...prevHistory, structuredClone(newHistory)]);
  }, []);

  const checkTurn = useCallback(
    (direction: Direction) => {
      // 셀 이동
      const moveResult = cellService.moveCells(cells, direction);

      const movedCells = moveResult.result;
      const newMergedCells = moveResult.mergedCells;
      const newIsMoved = moveResult.isMoved;
      const addScore = moveResult.addScore;

      if (newIsMoved) {
        const newCells = cellService.addOneRandomCell(movedCells);

        // 점수 연산
        const newScore = score + addScore;
        const newHighScore = scoreService.getHighScore(newScore, highScore);

        // 다음 턴 진행 가능한지 확인
        if (cellService.is128Exist(newCells)) {
          setGameOver(GameOverStatus.SUCCESS);
        } else if (!cellService.checkCanMove(newCells)) {
          setGameOver(GameOverStatus.FAIL);
        }

        setCells(newCells);
        setMergedCells(newMergedCells);
        saveCellsHistory({ cells: newCells, score: newScore });
        setScore(newScore);
        setHighScore(newHighScore);
      }
    },
    [score, cells, highScore, cellService, scoreService, saveCellsHistory],
  );

  const checkUndo = () => {
    const undoResult = undoService.undo(history);

    if (undoResult.currentCell !== undefined) {
      setCells(undoResult.currentCell);
      // 점수 변경
      const newScore = undoResult.currentScore ?? 0;
      setScore(newScore);
    }
    setHistory(undoResult.history);
  };

  const checkReload = useCallback(() => {
    const data = cellService.getData();

    const emptyCells = Array<null>(4)
      .fill(null)
      .map(() => Array<null>(4).fill(null));
    const initCells = cellService.addTwoRandomCells(emptyCells);

    // 로컬스토리지에 데이터가 있으면 해당 데이터로 불러오기
    if (
      data.cells !== undefined &&
      cellService.getEmptyCellsIndex(data.cells).length === 16
    ) {
      setCells(initCells);
      setHistory([{ cells: initCells, score: 0 }]);
    } else {
      setCells(data.cells ?? initCells);
      setHistory(data.history ?? [{ cells: initCells, score: 0 }]);
    }
    setScore(data.score ?? 0);
    setHighScore(data.highScore ?? 0);
    setGameOver(data.gameOver ?? GameOverStatus.NONE);
  }, [cellService]);

  const checkInit = () => {
    cellService.resetData();

    const emptyCells = Array<null>(4)
      .fill(null)
      .map(() => Array<null>(4).fill(null));
    const initCells = cellService.addTwoRandomCells(emptyCells);

    setCells(initCells);
    setScore(0);
    setHistory([{ cells: initCells, score: 0 }]);
    setGameOver(GameOverStatus.NONE);

    // highScore는 다시 로컬스토리지에 저장
    cellService.saveData({
      highScore: highScore,
    });
  };

  return {
    cells,
    mergedCells,
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
