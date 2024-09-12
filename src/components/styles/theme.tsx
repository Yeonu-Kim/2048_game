interface ColorProps {
  default: string;
  black: string;
  white: string;
  background: string;
  primary: string;
  secondary: string;
  secondaryBright: string;
}

interface FontSizeProps {
  XL: number;
  L: number;
  R: number;
  S: number;
}

const color: ColorProps = {
  default: 'transparent',
  black: '#000000',
  white: '#ffffff',
  background: '#faf8ef',
  primary: '#bbada0',
  secondary: '#776e65',
  secondaryBright: 'rgba(238, 228, 218, 0.35)',
};

const font: FontSizeProps = {
  XL: 4.8,
  L: 3.2,
  R: 1.6,
  S: 1.2,
};

const theme = {
  color,
  font,
};

export type ThemeProps = typeof theme;

export default theme;
