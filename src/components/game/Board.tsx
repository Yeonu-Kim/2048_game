import React from 'react';
import styled from 'styled-components';

import { GameOverStatus } from '../types/GameType.tsx';
import Cell from './Cell';
import GameOverModal from './GameOver.tsx';
interface BoardProps {
  cells: (number | null)[][];
  gameOver: GameOverStatus;
  checkInit: () => void;
}

const Board: React.FC<BoardProps> = ({ cells, gameOver, checkInit }) => {
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
      {gameOver === GameOverStatus.Success && (
        <GameOverModal checkInit={checkInit} isWon />
      )}
      {gameOver === GameOverStatus.Fail && (
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
export default Board;
