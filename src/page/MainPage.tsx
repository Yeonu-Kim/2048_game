import styled from 'styled-components';

import { Footer } from '../components/Footer.tsx';
import { Game } from '../components/game/Game.tsx';
import { StyledContainer } from '../components/styles/Container.styled.tsx';

export const MainPage = () => {
  return (
    <StyledBackground>
      <StyledMainContainer gap={5}>
        <Game />
        <Footer />
      </StyledMainContainer>
    </StyledBackground>
  );
};

const StyledMainContainer = styled(StyledContainer)`
  width: 50rem;
  height: 100%;
  padding: 2rem 0;
`;

const StyledBackground = styled.div`
  background: ${({ theme }) => theme.color.background};
  display: flex;
  justify-content: center;
  width: 100dvw;
`;
