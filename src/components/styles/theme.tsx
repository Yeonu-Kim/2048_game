interface ColorProps {
  default: string;
  black: string;
  white: string;
  background: string;
  primary: string;
  secondary: string;
  secondaryBright: string;
}

interface PixelProps {
  grid_size: number;
  cell_size: number;
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

const pixel: PixelProps = {
  grid_size: 4,
  cell_size: 11,
};

const theme = {
  color,
  pixel,
};

export type ThemeProps = typeof theme;

export default theme;
