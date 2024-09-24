import type { Cells, History } from '../entities/gameType.ts';

type UndoProps = {
  history: History;
  currentCell?: Cells;
};

export const undo = (prevHistory: History): UndoProps => {
  if (prevHistory.length > 1) {
    const newHistory = prevHistory.slice(0, -1);
    const previousCells = newHistory[newHistory.length - 1];

    return { history: newHistory, currentCell: previousCells };
  }

  return { history: prevHistory, currentCell: prevHistory[0] };
};
