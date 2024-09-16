import type React from 'react';

import { HighScoreBar, ScoreBar } from './game/Score.tsx';
import { StyledButton } from './styles/Button.styled.tsx';
import {
  StyledContainer,
  StyledContainerH,
  StyledFullContainer,
  StyledFullContainerH,
} from './styles/Container.styled.tsx';
import { StyledFont } from './styles/Font.styled.tsx';

interface HeaderProps {
  undo: () => void;
}
const Header: React.FC<HeaderProps> = ({ undo }) => {
  const onClickUndo = () => {
    undo();
  };
  const onClickNewGame = () => {
    window.location.reload();
  };
  return (
    <StyledFullContainerH>
      <StyledContainer width={70} color="secondaryDark">
        <StyledFont size="XL" bold>
          2048
        </StyledFont>
        <StyledContainer color="secondary">
          <StyledFont>128 블럭까지 만들어보세요!</StyledFont>
          <StyledFont>
            <StyledFont as="a" href="#how-to-play" bold>
              게임 방법
            </StyledFont>{' '}
            |{' '}
            <StyledFont
              as="a"
              href="https://github.com/Yeonu-Kim/2048_game"
              bold
            >
              코드 보기
            </StyledFont>
          </StyledFont>
        </StyledContainer>
      </StyledContainer>
      <StyledFullContainer width={30}>
        <StyledContainerH>
          <ScoreBar />
          <HighScoreBar />
        </StyledContainerH>
        <StyledFullContainer>
          <StyledButton
            onClick={onClickNewGame}
            background="primary"
            color="white"
          >
            New Game
          </StyledButton>
          <StyledButton onClick={onClickUndo} background="secondary">
            Undo
          </StyledButton>
        </StyledFullContainer>
      </StyledFullContainer>
    </StyledFullContainerH>
  );
};

export default Header;
