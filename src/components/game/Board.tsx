import styled from 'styled-components';

const Board = () => {
  const renderBackgroundCell = () => {
    const totalCellsCount = 16;

    return Array.from({ length: totalCellsCount }, (_, index) => (
      <BackgroundCell key={index} />
    ));
  };

  return (
    <GameBoardLayout id="gameboard">{renderBackgroundCell()}</GameBoardLayout>
  );
};

const BackgroundCell = styled.div`
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.color.secondaryBright};
`;
const GameBoardLayout = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(
    ${({ theme }) => theme.pixel.gridSize},
    ${({ theme }) => theme.pixel.cellSize}rem
  );
  grid-template-rows: repeat(
    ${({ theme }) => theme.pixel.gridSize},
    ${({ theme }) => theme.pixel.cellSize}rem
  );
  gap: 10px;
  padding: 15px;
  background: ${({ theme }) => theme.color.primary};
  border-radius: 10px;
`;
export default Board;
