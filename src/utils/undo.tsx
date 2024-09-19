type undoProps = {
  history: (number | null)[][][];
  currentCell?: (number | null)[][];
};

const undo = (prevHistory: (number | null)[][][]): undoProps => {
  if (prevHistory.length > 1) {
    const newHistory = prevHistory.slice(0, -1);
    const previousCells = newHistory[newHistory.length - 1];

    return { history: newHistory, currentCell: previousCells };
  }

  return { history: prevHistory, currentCell: prevHistory[0] };
};

export default undo;
