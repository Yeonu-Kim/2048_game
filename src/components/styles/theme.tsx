interface ColorProps {
  default: string;
  black: string;
  white: string;
  background: string;
  primary: string;
  secondary: string;
  secondaryBright: string;
  secondaryDark: string;
}

interface FontSizeProps {
  XL: number;
  L: number;
  R: number;
  S: number;
}

interface PixelProps {
  cellSize: number;
}

const color: ColorProps = {
  default: 'transparent',
  black: '#000000',
  white: '#ffffff',
  background: '#faf8ef',
  primary: '#bbada0',
  secondary: '#776e65',
  secondaryBright: 'rgba(238, 228, 218, 0.35)',
  secondaryDark: '#8f7a66',
};

const font: FontSizeProps = {
  XL: 8.0,
  L: 2.4,
  R: 1.6,
  S: 1.0,
};

const pixel: PixelProps = {
  cellSize: 11,
};

const theme = {
  color,
  font,
  pixel,
};

export type ThemeProps = typeof theme;

export default theme;
