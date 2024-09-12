import { HighScoreBar, ScoreBar } from './game/Score.tsx';
import { StyledButton } from './styles/Button.styled.tsx';
import {
  StyledContainer,
  StyledContainerH,
  StyledFullContainer,
  StyledFullContainerH,
} from './styles/Container.styled.tsx';
import { StyledFont } from './styles/Font.styled.tsx';

const Header = () => {
  const onClickNewGame = () => {
    window.location.reload();
  };
  return (
    <StyledFullContainerH>
      <StyledContainer width={70} color="black">
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
        <StyledButton onClick={onClickNewGame}>New Game</StyledButton>
      </StyledFullContainer>
    </StyledFullContainerH>
  );
};

export default Header;
