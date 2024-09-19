import getEmptyCellsIndex from './getEmptyCells';

export const addTwoRandomCells = (
  cells: (number | null)[][],
): (number | null)[][] => {
  const emptyCells = getEmptyCellsIndex(cells);

  const randomIndices = emptyCells.sort(() => Math.random() - 0.5).slice(0, 2);

  const newCells = [...cells].map((row) => [...row]);
  randomIndices.forEach(([rowIndex, colIndex]) => {
    // 이 조건 깔끔하게 처리할 수 있는 방법 확인
    if (newCells[rowIndex] !== undefined) {
      newCells[rowIndex][colIndex] = 2;
    }
  });

  return newCells;
};

export const addOneRandomCell = (
  cells: (number | null)[][],
): (number | null)[][] => {
  const emptyCells = getEmptyCellsIndex(cells);

  const randomIndex = emptyCells.sort(() => Math.random() - 0.5).slice(0, 1);
  const newCells = [...cells].map((row) => [...row]);

  randomIndex.forEach(([rowIndex, colIndex]) => {
    // 이 조건 깔끔하게 처리할 수 있는 방법 확인
    if (newCells[rowIndex] !== undefined) {
      newCells[rowIndex][colIndex] = 2;
    }
  });

  return newCells;
};
