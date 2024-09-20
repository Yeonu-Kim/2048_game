import type { CellsType } from '../components/types/GameType';

const getEmptyCellsIndex = (cells: CellsType): [number, number][] => {
  const emptyCells: [number, number][] = [];
  cells.forEach((row, rowIndex) => {
    row.forEach((value, colIndex) => {
      if (value === null) {
        emptyCells.push([rowIndex, colIndex]);
      }
    });
  });
  return emptyCells;
};

export default getEmptyCellsIndex;
