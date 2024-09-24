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

export const moveCellsByDirection = (
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

const moveRowLeft = (row: CellType[]) => {
  const reduced = row.reduce(
    (
      acc: { lastCell: CellType; result: CellType[]; addScore: number },
      cell,
    ) => {
      if (cell === null) {
        return acc;
      } else if (acc.lastCell === null) {
        return { ...acc, lastCell: cell };
      } else if (acc.lastCell === cell) {
        return {
          result: [...acc.result, cell * 2],
          lastCell: null,
          addScore: acc.addScore + cell * 2,
        };
      } else {
        return {
          ...acc,
          result: [...acc.result, acc.lastCell],
          lastCell: cell,
        };
      }
    },
    { lastCell: null, result: [], addScore: 0 },
  );

  const result = [...reduced.result, reduced.lastCell];
  const resultRow = Array.from(
    { length: row.length },
    (_, i) => result[i] ?? null,
  );

  return {
    result: resultRow,
    isMoved: row.some((cell, i) => cell !== resultRow[i]),
    addScore: reduced.addScore,
  };
};

const moveLeft = (rotatedCells: Cells) => {
  const movedRows = rotatedCells.map(moveRowLeft);
  const result = movedRows.map((movedRow) => movedRow.result);
  const isMoved = movedRows.some((movedRow) => movedRow.isMoved);
  const addScore = movedRows.reduce(
    (acc, movedRow) => acc + movedRow.addScore,
    0,
  );
  return { result, isMoved, addScore };
};

export const rotateMapCounterClockwise = (
  prevCells: Cells,
  degree: RotateDegree,
) => {
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
      return Array.from({ length: 4 }, (_, rowIndex) =>
        Array.from(
          { length: 4 },
          (__, colIndex) => prevCells[3 - rowIndex]?.[3 - colIndex] ?? null,
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

export const is128Exist = (newCells: Cells) => {
  return newCells.some((row) => row.includes(128));
};

export const getEmptyCellsIndex = (cells: Cells): [number, number][] => {
  return cells.flatMap((row, i) =>
    row.flatMap((cell, j): [number, number][] =>
      cell === null ? [[i, j]] : [],
    ),
  );
};

export const addTwoRandomCells = (cells: Cells): Cells => {
  const emptyCells = getEmptyCellsIndex(cells);

  const randomIndices = emptyCells.sort(() => Math.random() - 0.5).slice(0, 2);

  const newCells = cells.map((row, i) =>
    row.map((cell, j) =>
      randomIndices.some((indice) => indice[0] === i && indice[1] === j)
        ? 2
        : cell,
    ),
  );

  return newCells;
};

export const addOneRandomCell = (cells: Cells): Cells => {
  const emptyCells = getEmptyCellsIndex(cells);

  const randomIndex = emptyCells.sort(() => Math.random() - 0.5).slice(0, 1);
  const newCells = cells.map((row, i) =>
    row.map((cell, j) =>
      randomIndex.some((indice) => indice[0] === i && indice[1] === j)
        ? 2
        : cell,
    ),
  );

  return newCells;
};
