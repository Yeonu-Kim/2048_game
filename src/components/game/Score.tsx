import styled from 'styled-components';

import { StyledContainer } from '@/components/styles/Container.styled';
import { StyledFont } from '@/components/styles/Font.styled';

type ScoreBarProps = {
  score: number;
  isHighScore?: boolean;
};

export const ScoreBar = ({ score, isHighScore = false }: ScoreBarProps) => {
  return (
    <StyledScoreContainer alignH="center" background="primary" gap={0}>
      <StyledFont size="S" color="white" bold>
        {isHighScore ? 'HIGHSCORE' : 'SCORE'}
      </StyledFont>
      <StyledFont size="L" color="white" bold>
        {score}
      </StyledFont>
    </StyledScoreContainer>
  );
};

const StyledScoreContainer = styled(StyledContainer)`
  border-radius: 5px;
  padding: 10px 0;
`;
