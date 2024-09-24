import styled from 'styled-components';

type StyledContainerProps = {
  background?:
    | 'white'
    | 'black'
    | 'background'
    | 'primary'
    | 'secondary'
    | 'secondaryBright'
    | 'secondaryDark'
    | 'default';
  color?:
    | 'white'
    | 'black'
    | 'primary'
    | 'secondary'
    | 'secondaryBright'
    | 'secondaryDark';
  width?: number;
  align?: 'left' | 'center' | 'right';
  alignH?: 'left' | 'center' | 'right';
  gap?: number;
};

const createFlexContainer = (
  direction: 'column' | 'row' = 'column',
) => styled.div<StyledContainerProps>`
  display: flex;
  flex-direction: ${direction};
  background-color: ${({ theme, background = 'default' }) =>
    theme.color[background]};
  color: ${({ theme, color = 'black' }) => theme.color[color]};
  width: ${({ width = 100 }) => `${width}%`};
  gap: ${({ gap = 1 }) => `${gap}rem`};
`;

export const StyledContainer = styled(createFlexContainer())`
  justify-content: ${({ align }) =>
    align === 'center'
      ? 'center'
      : align === 'right'
        ? 'flex-end'
        : 'flex-start'};
  text-align: ${({ alignH = 'left' }) => alignH};
  align-items: ${({ alignH }) =>
    alignH === 'center'
      ? 'center'
      : alignH === 'right'
        ? 'flex-end'
        : 'flex-start'};
`;

export const StyledFullContainer = styled(createFlexContainer())`
  justify-content: space-between;
`;

export const StyledContainerH = styled(createFlexContainer('row'))`
  justify-content: ${({ alignH }) =>
    alignH === 'center'
      ? 'center'
      : alignH === 'right'
        ? 'flex-end'
        : 'flex-start'};
  text-align: ${({ alignH }) => alignH};
  align-items: ${({ align }) =>
    align === 'center'
      ? 'center'
      : align === 'right'
        ? 'flex-end'
        : 'flex-start'};
`;

export const StyledFullContainerH = createFlexContainer('row');

// export const StyledFadeUpContainerH = styled(StyledContainerH)`
//   animation: ${fadeInUp} 0.8s ease forwards;
// `;
