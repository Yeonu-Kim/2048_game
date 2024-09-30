import type {
  Cells,
  CellType,
  Direction,
  RotateDegree,
} from '../entities/gameType.ts';

type DirectionDegreeProps = {
  up: RotateDegree;
  right: RotateDegree;
  down: RotateDegree;
  left: RotateDegree;
};

const moveCellsByDirection = (
  direction: Direction,
): [RotateDegree, RotateDegree] => {
  const rotateDegree: DirectionDegreeProps = {
    up: 90,
    right: 180,
    down: 270,
    left: 0,
  };

  const revertDegree: DirectionDegreeProps = {
    up: 270,
    right: 180,
    down: 90,
    left: 0,
  };

  return [rotateDegree[direction], revertDegree[direction]];
};

const generateCellId = () => Math.random().toString(36).slice(2, 11);

const moveRowLeft = (row: CellType[]) => {
  const reduced = row.reduce(
    (
      acc: {
        lastCell: CellType;
        result: CellType[];
        mergedCells: CellType[];
        addScore: number;
      },
      cell,
    ) => {
      if (cell === null) {
        return acc;
      } else if (acc.lastCell === null) {
        return { ...acc, lastCell: cell };
      } else if (acc.lastCell.value === cell.value) {
        const newCellId = generateCellId();
        const newCell = {
          id: newCellId,
          value: cell.value * 2,
          mergedToId: null,
        };
        const movedLastCell = {
          ...acc.lastCell,
          mergedToId: newCellId,
        };
        const movedCell = {
          ...cell,
          mergedToId: newCellId,
        };
        return {
          result: [...acc.result, newCell],
          mergedCells: [...acc.mergedCells, movedLastCell, movedCell],
          lastCell: null,
          addScore: acc.addScore + cell.value * 2,
        };
      } else {
        return {
          ...acc,
          result: [...acc.result, acc.lastCell],
          lastCell: cell,
        };
      }
    },
    { lastCell: null, result: [], mergedCells: [], addScore: 0 },
  );

  const result = [...reduced.result, reduced.lastCell];
  const resultRow = Array.from(
    { length: row.length },
    (_, i) => result[i] ?? null,
  );

  return {
    result: resultRow,
    mergedCells: reduced.mergedCells,
    isMoved: row.some((cell, i) =>
      cell !== null ? cell.id !== resultRow[i]?.id : false,
    ),
    addScore: reduced.addScore,
  };
};

const moveLeft = (rotatedCells: Cells) => {
  const movedRows = rotatedCells.map(moveRowLeft);

  const result = movedRows.map((movedRow) => movedRow.result);
  const mergedCells = movedRows.flatMap((movedRow) => movedRow.mergedCells);
  const isMoved = movedRows.some((movedRow) => movedRow.isMoved);
  const addScore = movedRows.reduce(
    (acc, movedRow) => acc + movedRow.addScore,
    0,
  );

  return { result, mergedCells, isMoved, addScore };
};

const rotateMapCounterClockwise = (prevCells: Cells, degree: RotateDegree) => {
  switch (degree) {
    case 0:
      return prevCells;
    case 90:
      return Array.from({ length: 4 }, (_, colIndex) =>
        Array.from(
          { length: 4 },
          (__, rowIndex) => prevCells[rowIndex]?.[3 - colIndex] ?? null,
        ),
      );
    case 180:
      return Array.from({ length: 4 }, (_, colIndex) =>
        Array.from(
          { length: 4 },
          (__, rowIndex) => prevCells[3 - colIndex]?.[3 - rowIndex] ?? null,
        ),
      );
    case 270:
      return Array.from({ length: 4 }, (_, colIndex) =>
        Array.from(
          { length: 4 },
          (__, rowIndex) => prevCells[3 - rowIndex]?.[colIndex] ?? null,
        ),
      );
  }
};

export const moveCells = (cells: Cells, direction: Direction) => {
  const [rotateDirection, revertDirection] = moveCellsByDirection(direction);
  const rotatedCells = rotateMapCounterClockwise(cells, rotateDirection);
  const moveResult = moveLeft(rotatedCells);

  return {
    result: rotateMapCounterClockwise(moveResult.result, revertDirection),
    mergedCells: moveResult.mergedCells,
    isMoved: moveResult.isMoved,
    addScore: moveResult.addScore,
  };
};

export const checkCanMove = (newCells: Cells) => {
  const rotateDirections: RotateDegree[] = [0, 90, 180, 270];
  return rotateDirections.some((rotateDirection) => {
    const rotatedCells = rotateMapCounterClockwise(newCells, rotateDirection);
    const moveResult = moveLeft(rotatedCells);

    return moveResult.isMoved;
  });
};

export const is128Exist = (newCells: Cells): boolean => {
  return newCells.some((row) => row.some((cell) => cell?.value === 128));
};

export const getEmptyCellsIndex = (cells: Cells): [number, number][] => {
  return cells.flatMap((row, i) =>
    row.flatMap((cell, j): [number, number][] =>
      cell === null ? [[i, j]] : [],
    ),
  );
};

export const addTwoRandomCells = (cells: Cells): Cells => {
  const emptyCells: [number, number][] = getEmptyCellsIndex(cells);

  const randomIndices: [number, number][] = emptyCells
    .sort(() => Math.random() - 0.5)
    .slice(0, 2);

  const newCells: Cells = cells.map((row, colIndex) =>
    row.map((cell, rowIndex) =>
      randomIndices.some(([x, y]) => x === colIndex && y === rowIndex)
        ? {
            id: generateCellId(),
            value: 2,
            mergedToId: null,
          }
        : cell,
    ),
  );

  return newCells;
};

export const addOneRandomCell = (cells: Cells): Cells => {
  const emptyCells: [number, number][] = getEmptyCellsIndex(cells);

  const randomIndex: [number, number][] = emptyCells
    .sort(() => Math.random() - 0.5)
    .slice(0, 1);

  const newCells: Cells = cells.map((row, colIndex) =>
    row.map((cell, rowIndex) =>
      randomIndex.some(([x, y]) => x === colIndex && y === rowIndex)
        ? {
            id: generateCellId(),
            value: 2,
            mergedToId: null,
          }
        : cell,
    ),
  );

  return newCells;
};
