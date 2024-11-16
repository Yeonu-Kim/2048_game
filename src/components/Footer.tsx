import { StyledContainer } from './styles/Container.styled';
import { StyledFont } from './styles/Font.styled';

export const Footer = () => {
  return (
    <StyledContainer id="how-to-play">
      <StyledFont>
        <StyledFont bold>게임 방법</StyledFont>:{' '}
        <StyledFont bold>방향키</StyledFont>를 사용하여 타일을 이동시키세요.
        같은 숫자는 하나의 타일로 <StyledFont bold>합쳐집니다. </StyledFont>
        <StyledFont bold>128</StyledFont> 블럭을 만들 때까지 계속해보세요!
      </StyledFont>
      <StyledFont as="a" href="#gameboard" bold>
        게임보드로 이동하기
      </StyledFont>
    </StyledContainer>
  );
};
