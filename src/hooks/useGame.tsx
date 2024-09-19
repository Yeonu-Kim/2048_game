import { useCallback, useState } from 'react';

import { GameOverStatus } from '../components/types/GameType';
import { addOneRandomCell, addTwoRandomCells } from '../utils/addRandomCell';
import { checkCanMove, is128Exist } from '../utils/checkGameOver';
import { getHighScore, getScore } from '../utils/getScore';
import {
  getLocalData,
  resetLocalStorage,
  saveLocalStorage,
} from '../utils/localStorage';
import moveCells from '../utils/moveCells';
import moveCellsByDirection from '../utils/moveCellsByDirection';
import undo from '../utils/undo';

const useGame = () => {
  const [cells, setCells] = useState<(number | null)[][]>(
    Array<null>(4)
      .fill(null)
      .map(() => Array<null>(4).fill(null)),
  );
  const [history, setHistory] = useState<(number | null)[][][]>([]);
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<GameOverStatus>(GameOverStatus.None);

  const saveCellsHistory = useCallback((newCells: (number | null)[][]) => {
    setHistory((prevHistory: (number | null)[][][]) => [
      ...prevHistory,
      structuredClone(newCells),
    ]);
  }, []);

  const checkTurn = useCallback(
    (direction: 'up' | 'left' | 'right' | 'down') => {
      // 셀 이동
      const [rotateDegree, revertDegree] = moveCellsByDirection(direction);
      const moveResult = moveCells(cells, rotateDegree, revertDegree);

      const movedCells = moveResult.result;
      const newIsMoved = moveResult.isMoved;

      if (newIsMoved) {
        const newCells = addOneRandomCell(movedCells);

        // 점수 연산
        const newScore = getScore(newCells);
        const newHighScore = getHighScore(newScore, highScore);

        // 다음 턴 진행 가능한지 확인
        if (is128Exist(newCells)) {
          setGameOver(GameOverStatus.Success);
          saveLocalStorage({ gameOver: GameOverStatus.Success });
        } else if (!checkCanMove(newCells)) {
          setGameOver(GameOverStatus.Fail);
          saveLocalStorage({ gameOver: GameOverStatus.Fail });
        }

        // 데이터 저장
        saveLocalStorage({
          cells: newCells,
          history: [...history, structuredClone(newCells)],
          score: newScore,
          highScore: newHighScore,
        });

        setCells(newCells);
        saveCellsHistory(newCells);
        setScore(newScore);
        setHighScore(newHighScore);
      }
    },
    [cells, history, highScore, saveCellsHistory],
  );

  const checkUndo = () => {
    const undoResult = undo(history);

    if (undoResult.currentCell !== undefined) {
      setCells(undoResult.currentCell);
      // 점수 변경
      const newScore = getScore(undoResult.currentCell);
      setScore(newScore);

      // 변경 내용 로컬스토리지에 반영
      saveLocalStorage({
        cells: undoResult.currentCell,
        history: undoResult.history,
      });
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
    if (data.cells !== undefined) {
      setCells(data.cells);
    } else {
      data.cells = initCells;
      setCells(initCells);
    }
    if (data.history !== undefined) {
      setHistory(data.history);
    } else {
      data.history = [];
      setHistory([]);
    }
    if (data.score !== undefined) {
      setScore(data.score);
    } else {
      data.score = 4;
      setScore(4);
    }
    if (data.highScore !== undefined) {
      setHighScore(data.highScore);
    } else {
      data.highScore = 4;
      setHighScore(4);
    }
    if (data.gameOver !== undefined) {
      setGameOver(data.gameOver);
    } else {
      data.gameOver = GameOverStatus.None;
      setGameOver(GameOverStatus.None);
    }

    saveLocalStorage(data);
  }, []);

  const checkInit = () => {
    resetLocalStorage();

    const emptyCells = Array<null>(4)
      .fill(null)
      .map(() => Array<null>(4).fill(null));
    const initCells = addTwoRandomCells(emptyCells);

    setCells(initCells);
    setScore(4);
    setHistory([initCells]);
    setGameOver(GameOverStatus.None);

    // highScore는 다시 로컬스토리지에 저장
    saveLocalStorage({
      highScore: highScore,
    });
  };

  return {
    cells,
    score,
    highScore,
    gameOver,
    checkTurn,
    checkUndo,
    checkReload,
    checkInit,
  };
};

export default useGame;
