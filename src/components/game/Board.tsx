import styled from 'styled-components';

import type { Cells, CellType } from '../../entities/gameType.ts';
import { GameOverStatus } from '../../entities/gameType.ts';
import { Cell } from './Cell';
import { GameOverModal } from './GameOver.tsx';

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
    // 의문점: 왜 이차원 배열 상태에서 각 열마다 렌더링하면 상하 이동 시 애니메이션이 안 먹을까
    // 일차원 배열로 변환해서 진행함.
    const flattenedCells = cells.flat();
    return flattenedCells.map((cell, index) => {
      if (cell === null) {
        return null;
      }

      const colIndex = Math.floor(index / 4);
      const rowIndex = index % 4;

      return (
        <Cell key={cell.id} left={rowIndex} top={colIndex} value={cell.value} />
      );
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

        return (
          <Cell
            key={mergedCell.id}
            left={rowIndex}
            top={colIndex}
            value={mergedCell.value}
          />
        );
      });
  };

  const renderAllCells = () => {
    // 셀을 하나의 JSX 배열로 묶어서 전달
    const regularCells = renderCells();
    const mergedCellsRender = renderMergedCells();

    const allCells = [...regularCells, ...mergedCellsRender];

    return allCells;
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
