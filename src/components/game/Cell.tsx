import React from 'react';
import styled from 'styled-components';

interface CellProps {
  position: number[];
  value: number | null;
}

interface StyledCellProps {
  left: number;
  top: number;
}

const Cell: React.FC<CellProps> = ({ position, value }) => {
  const left = position[0] ?? 0;
  const top = position[1] ?? 0;

  return (
    <StyledCell left={left} top={top}>
      {value}
    </StyledCell>
  );
};

const StyledCell = styled.div<StyledCellProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: ${({ theme, top }) => `${(theme.pixel.cellSize + 1) * top}rem`};
  left: ${({ theme, left }) => `${(theme.pixel.cellSize + 1) * left}rem`};
  width: calc(${({ theme }) => theme.pixel.cellSize}rem);
  height: calc(${({ theme }) => theme.pixel.cellSize}rem);
  margin: 14px;
  border-radius: 10px;
  background: ${({ theme }) => theme.color.secondaryBright};
  color: ${({ theme }) => theme.color.black};
  font-size: 3.2rem;
  font-weight: bold;
  transition-property: left, top, transform;
  transition-duration: 200ms, 200ms, 100ms;
`;

export default Cell;
