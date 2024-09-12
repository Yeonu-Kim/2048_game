import styled from 'styled-components';

import { StyledContainer } from '../styles/Container.styled.tsx';
import { StyledFont } from '../styles/Font.styled';

export const ScoreBar = () => {
  return (
    <StyledScoreContainer alignH="center" background="primary">
      <StyledFont size="S" bold>
        SCORE
      </StyledFont>
      <StyledFont size="S" bold>
        0
      </StyledFont>
    </StyledScoreContainer>
  );
};

export const HighScoreBar = () => {
  return (
    <StyledScoreContainer alignH="center" background="primary">
      <StyledFont size="S" bold>
        BEST
      </StyledFont>
      <StyledFont size="S" bold>
        0
      </StyledFont>
    </StyledScoreContainer>
  );
};

const StyledScoreContainer = styled(StyledContainer)`
  border-radius: 5px;
  padding: 10px 0;
`;
