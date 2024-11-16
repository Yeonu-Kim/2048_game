import styled from 'styled-components';

import { Footer } from '../components/Footer';
import { Game } from '../components/game/Game';
import { StyledContainer } from '../components/styles/Container.styled';
import type { Services } from '../entities/Service';

export const MainPage = ({ services }: { services: Services }) => {
  return (
    <StyledBackground>
      <StyledMainContainer gap={5}>
        <Game services={services} />
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
