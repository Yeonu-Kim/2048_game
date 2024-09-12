import styled from 'styled-components';

import Header from '../components/Header.tsx';
import { StyledContainer } from '../components/styles/Container.styled.tsx';

const MainPage = () => {
  return (
    <StyledBackground>
      <StyledMainContainer gap={5}>
        <Header />
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

export default MainPage;
