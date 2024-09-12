import React from 'react';
import styled from 'styled-components';

import Cell from './Cell';
interface BoardProps {
  cells: (number | null)[];
}

const Board: React.FC<BoardProps> = ({ cells }) => {
  const totalCellsCount = 16;
  const rowCellsCount = 4;

  const renderBackgroundCell = () => {
    return Array.from({ length: totalCellsCount }, (_, index) => (
      <BackgroundCell key={index} />
    ));
  };

  const renderCells = () => {
    return cells.map((value, index) => {
      const position = [
        index % rowCellsCount,
        Math.floor(index / rowCellsCount),
      ];
      return <Cell key={index} position={position} value={value} />;
    });
  };

  return (
    <GameBoardLayout id="gameboard">
      {renderBackgroundCell()}
      {renderCells()}
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
