import styled from 'styled-components';

import { StyledButton } from '../styles/Button.styled';
import { StyledContainer } from '../styles/Container.styled';
import { StyledFont } from '../styles/Font.styled';

type GameOverModalProps = {
  isWon?: boolean;
  checkInit: () => void;
};
export const GameOverModal = ({
  isWon = false,
  checkInit,
}: GameOverModalProps) => {
  return (
    <StyledModal align="center" alignH="center" gap={3}>
      <StyledFont size="L">{isWon ? '성공했어요!' : '게임 오버 😭'}</StyledFont>
      <StyledButton onClick={checkInit}>다시하기</StyledButton>
    </StyledModal>
  );
};

const StyledModal = styled(StyledContainer)`
  position: absolute;
  text-align: center;
  z-index: 129;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 1rem;
  background: rgba(181, 157, 135, 0.6);
`;
