import styled from 'styled-components';

type CellProps = {
  value: number | null;
  left: number;
  top: number;
};

export const Cell = ({ left, top, value }: CellProps) => {
  const getCell = () => {
    switch (value) {
      case 2:
        return (
          <Cell2 left={left} top={top} value={value}>
            {value}
          </Cell2>
        );
      case 4:
        return (
          <Cell4 left={left} top={top} value={value}>
            {value}
          </Cell4>
        );
      case 8:
        return (
          <Cell8 left={left} top={top} value={value}>
            {value}
          </Cell8>
        );
      case 16:
        return (
          <Cell16 left={left} top={top} value={value}>
            {value}
          </Cell16>
        );
      case 32:
        return (
          <Cell32 left={left} top={top} value={value}>
            {value}
          </Cell32>
        );
      case 64:
        return (
          <Cell64 left={left} top={top} value={value}>
            {value}
          </Cell64>
        );
      case 128:
        return (
          <Cell128 left={left} top={top} value={value}>
            {value}
          </Cell128>
        );
      default:
        return null;
    }
  };

  return <>{getCell()}</>;
};

const StyledCell = styled.div<CellProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(
    ${({ theme, left }) => `${(theme.pixel.cellSize + 1) * left}rem`},
    ${({ theme, top }) => `${(theme.pixel.cellSize + 1) * top}rem`}
  );
  width: calc(${({ theme }) => theme.pixel.cellSize}rem);
  height: calc(${({ theme }) => theme.pixel.cellSize}rem);
  margin: 14px;
  border-radius: 10px;
  font-size: 3.2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.color.secondaryDark};
  transition: all 200ms ease-out;
  z-index: ${({ value }) => `${value ?? 0}`};
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
