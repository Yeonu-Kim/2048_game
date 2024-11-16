import styled from 'styled-components';

import type { Cells, CellType } from '../../entities/gameType';
import { GameOverStatus } from '../../entities/gameType';
import { Cell } from './Cell';
import { GameOverModal } from './GameOver';

type BoardProps = {
  cells: Cells;
  mergedCells: CellType[];
  gameOver: GameOverStatus;
  checkInit: () => void;
};

export const Board = ({
  cells,
  mergedCells,
  gameOver,
  checkInit,
}: BoardProps) => {
  const totalCellsCount = 16;

  const renderBackgroundCell = () => {
    return Array.from({ length: totalCellsCount }, (_, index) => (
      <BackgroundCell key={index} />
    ));
  };

  const renderCells = () => {
    const flattenedCells = cells.flat();
    return flattenedCells.map((cell, index) => {
      if (cell === null) {
        return null;
      }

      const colIndex = Math.floor(index / 4);
      const rowIndex = index % 4;

      return { ...cell, row: rowIndex, col: colIndex };
    });
  };

  const renderMergedCells = () => {
    const flattenedCells = cells.flat();

    return mergedCells
      .filter((mergedCell) => mergedCell !== null)
      .map((mergedCell) => {
        // mergeToId를 사용하여 이동할 대상이 되는 셀의 위치 찾기
        const originalCellIndex = flattenedCells.findIndex(
          (cell) => cell?.id === mergedCell.mergedToId,
        );

        if (originalCellIndex === -1) {
          return null;
        }

        const colIndex = Math.floor(originalCellIndex / 4);
        const rowIndex = originalCellIndex % 4;

        return { ...mergedCell, row: rowIndex, col: colIndex };
      });
  };

  const renderAllCells = () => {
    const regularCells = renderCells();
    const mergedCellsRender = renderMergedCells();

    const allCells = [...regularCells, ...mergedCellsRender]
      .filter((cell) => cell !== null)
      .sort((firstCell, secondCell) =>
        firstCell.id.localeCompare(secondCell.id),
      );

    return allCells.map((cell) => (
      <Cell key={cell.id} left={cell.row} top={cell.col} value={cell.value} />
    ));
  };

  return (
    <GameBoardLayout id="gameboard">
      {renderBackgroundCell()}
      {renderAllCells()}
      {gameOver === GameOverStatus.SUCCESS && (
        <GameOverModal checkInit={checkInit} isWon />
      )}
      {gameOver === GameOverStatus.FAIL && (
        <GameOverModal checkInit={checkInit} />
      )}
    </GameBoardLayout>
  );
};

const BackgroundCell = styled.div`
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.color.secondaryBright};
`;
const GameBoardLayout = styled.div`
  display: grid;
  position: relative;
  width: 100%;
  grid-template-columns: repeat(4, ${({ theme }) => theme.pixel.cellSize}rem);
  grid-template-rows: repeat(4, ${({ theme }) => theme.pixel.cellSize}rem);
  gap: 10px;
  padding: 15px;
  background: ${({ theme }) => theme.color.primary};
  border-radius: 10px;
`;
