import styled from 'styled-components';

import { StyledContainer } from '../styles/Container.styled.tsx';
import { StyledFont } from '../styles/Font.styled';

export const ScoreBar = () => {
  return (
    <StyledScoreContainer alignH="center" background="primary" gap={0}>
      <StyledFont size="S" color="white" bold>
        SCORE
      </StyledFont>
      <StyledFont size="L" color="white" bold>
        0
      </StyledFont>
    </StyledScoreContainer>
  );
};

export const HighScoreBar = () => {
  return (
    <StyledScoreContainer alignH="center" background="primary" gap={0}>
      <StyledFont size="S" color="white" bold>
        BEST
      </StyledFont>
      <StyledFont size="L" color="white" bold>
        0
      </StyledFont>
    </StyledScoreContainer>
  );
};

const StyledScoreContainer = styled(StyledContainer)`
  border-radius: 5px;
  padding: 10px 0;
`;
