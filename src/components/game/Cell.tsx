import React from 'react';
import styled, { keyframes } from 'styled-components';

interface CellProps {
  position: number[];
  value: number | null;
}

interface StyledCellProps {
  left: number;
  top: number;
}

const Cell: React.FC<CellProps> = ({ position, value }) => {
  const top = position[0] ?? 0;
  const left = position[1] ?? 0;

  const getCell = () => {
    switch (value) {
      case 2:
        return (
          <Cell2 left={left} top={top}>
            {value}
          </Cell2>
        );
      case 4:
        return (
          <Cell4 left={left} top={top}>
            {value}
          </Cell4>
        );
      case 8:
        return (
          <Cell8 left={left} top={top}>
            {value}
          </Cell8>
        );
      case 16:
        return (
          <Cell16 left={left} top={top}>
            {value}
          </Cell16>
        );
      case 32:
        return (
          <Cell32 left={left} top={top}>
            {value}
          </Cell32>
        );
      case 64:
        return (
          <Cell64 left={left} top={top}>
            {value}
          </Cell64>
        );
      case 128:
        return (
          <Cell128 left={left} top={top}>
            {value}
          </Cell128>
        );
      default:
        return null;
    }
  };

  return <>{getCell()}</>;
};

const show = keyframes`
  0% {
    opacity: 0.5;
    transform: scale(0);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

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
  font-size: 3.2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.color.secondaryDark};
  transition-property: left, top, transform;
  transition-duration: 200ms, 200ms, 100ms;
  animation: ${show} 200ms ease-in-out;
`;

const Cell2 = styled(StyledCell)`
  background: #faf8ef;
`;

const Cell4 = styled(StyledCell)`
  background: #ede0c8;
`;

const Cell8 = styled(StyledCell)`
  background: #f2b179;
`;
const Cell16 = styled(StyledCell)`
  background: #f59563;
  color: ${({ theme }) => theme.color.white};
`;
const Cell32 = styled(StyledCell)`
  background: #f67c5f;
  color: ${({ theme }) => theme.color.white};
`;
const Cell64 = styled(StyledCell)`
  background: #f65e3b;
  color: ${({ theme }) => theme.color.white};
`;
const Cell128 = styled(StyledCell)`
  background: #edcf72;
`;

export default Cell;
