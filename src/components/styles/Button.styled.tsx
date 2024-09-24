import type { MouseEvent } from 'react';
import styled from 'styled-components';

type StyledButtonProps = {
  color?: 'primary' | 'secondary' | 'white' | 'black';
  background?:
    | 'primary'
    | 'secondary'
    | 'white'
    | 'black'
    | 'secondaryBright'
    | 'secondaryDark';
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

export const StyledButton = styled.button<StyledButtonProps>`
  padding: 1rem 2rem;
  border-radius: 1rem;
  color: ${({ theme, color = 'white' }) => theme.color[color]};
  background-color: ${({ theme, background = 'secondaryDark' }) =>
    theme.color[background]};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.8rem;
  font-weight: bold;
`;
