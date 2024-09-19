import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import usePreviousProps from '../../hooks/usePreviousProps';

const mergeAnimationDuration = 200;

interface CellProps {
  position: [number, number];
  value: number | null;
}

interface StyledCellProps {
  top: number;
  left: number;
  value: number | null;
  scale: number;
}

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
  background: ${({ value }) => getCellBackground(value)};
  color: ${({ value }) => getCellTextColor(value)};
  transition:
    top 200ms ease,
    left 200ms ease,
    transform 100ms ease;
  transform: scale(${({ scale }) => scale});
  z-index: ${({ value }) => value};
`;

const getCellBackground = (value: number | null) => {
  switch (value) {
    case 2:
      return '#eee4da';
    case 4:
      return '#ede0c8';
    case 8:
      return '#f2b179';
    case 16:
      return '#f59563';
    case 32:
      return '#f67c5f';
    case 64:
      return '#f65e3b';
    case 128:
      return '#edcf72';
    case 256:
      return '#edcc61';
    case 512:
      return '#edc850';
    case 1024:
      return '#edc53f';
    case 2048:
      return '#edc22e';
    default:
      return 'transparent';
  }
};

const getCellTextColor = (value: number | null) => {
  if (value !== null && value <= 4) return '#776e65';
  return '#f9f6f2';
};

const Cell: React.FC<CellProps> = ({ position, value }) => {
  const [scale, setScale] = useState(1);

  // 새로 생성되거나 머지할 때 살짝 커지도록 애니메이션 넣기
  const previousValue = usePreviousProps(value);
  const hasChanged = previousValue !== value;

  useEffect(() => {
    if (hasChanged) {
      setScale(1.1);
      setTimeout(() => {
        setScale(1);
      }, mergeAnimationDuration);
    }
  }, [hasChanged]);

  return (
    <StyledCell
      top={position[0]}
      left={position[1]}
      value={value}
      scale={scale}
    >
      {value}
    </StyledCell>
  );
};

export default Cell;
