import type React from 'react';

import { ScoreBar } from './game/Score.tsx';
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
  onClickNewGame: () => void;
  score: number;
  highScore: number;
}
const Header: React.FC<HeaderProps> = ({
  undo,
  onClickNewGame,
  score,
  highScore,
}) => {
  const onClickUndo = () => {
    undo();
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
          <ScoreBar score={score} />
          <ScoreBar score={highScore} isHighScore />
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
