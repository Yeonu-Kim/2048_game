import type { Cells, HistoryList } from '@/entities/gameType';

type UndoProps = {
  history: HistoryList;
  currentCell?: Cells;
  currentScore?: number;
};

export type UndoService = {
  undo: (prevHistory: HistoryList) => UndoProps;
};

export const implUndoService = (): UndoService => ({
  undo: (prevHistory: HistoryList): UndoProps => {
    if (prevHistory.length > 1) {
      const newHistory = prevHistory.slice(0, -1);
      const previousCells = newHistory[newHistory.length - 1]?.cells;
      const previousScore = newHistory[newHistory.length - 1]?.score;

      return {
        history: newHistory,
        currentCell: previousCells,
        currentScore: previousScore,
      };
    }

    return {
      history: prevHistory,
      currentCell: prevHistory[0]?.cells,
      currentScore: prevHistory[0]?.score,
    };
  },
});
