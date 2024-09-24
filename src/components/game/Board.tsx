import styled from 'styled-components';

import type { Cells } from '../../entities/gameType.ts';
import { GameOverStatus } from '../../entities/gameType.ts';
import { Cell } from './Cell';
import { GameOverModal } from './GameOver.tsx';

type BoardProps = {
  cells: Cells;
  gameOver: GameOverStatus;
  checkInit: () => void;
};

export const Board = ({ cells, gameOver, checkInit }: BoardProps) => {
  const totalCellsCount = 16;

  const renderBackgroundCell = () => {
    return Array.from({ length: totalCellsCount }, (_, index) => (
      <BackgroundCell key={index} />
    ));
  };

  const renderCells = () => {
    return cells.map((cellRow, rowIndex) =>
      cellRow.map((value, colIndex) => (
        <Cell
          key={`${rowIndex}-${colIndex}`}
          position={[rowIndex, colIndex]}
          value={value}
        />
      )),
    );
  };

  return (
    <GameBoardLayout id="gameboard">
      {renderBackgroundCell()}
      {renderCells()}
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
