import { useCallback } from 'react';

const useRotateCells = () => {
  const rotateMapCounterClockwise = useCallback(
    (prevCells: (number | null)[][], degree: 0 | 90 | 180 | 270) => {
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
    },
    [],
  );

  return {
    rotateMapCounterClockwise,
  };
};

export default useRotateCells;
