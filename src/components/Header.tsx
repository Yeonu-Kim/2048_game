import { ScoreBar } from './game/Score';
import { StyledButton } from './styles/Button.styled';
import {
  StyledContainer,
  StyledContainerH,
  StyledFullContainer,
  StyledFullContainerH,
} from './styles/Container.styled';
import { StyledFont } from './styles/Font.styled';

type HeaderProps = {
  checkUndo: () => void;
  checkInit: () => void;
  score: number;
  highScore: number;
};
export const Header = ({
  score,
  highScore,
  checkUndo,
  checkInit,
}: HeaderProps) => {
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
          <StyledButton onClick={checkInit} background="primary" color="white">
            New Game
          </StyledButton>
          <StyledButton onClick={checkUndo} background="secondary">
            Undo
          </StyledButton>
        </StyledFullContainer>
      </StyledFullContainer>
    </StyledFullContainerH>
  );
};
