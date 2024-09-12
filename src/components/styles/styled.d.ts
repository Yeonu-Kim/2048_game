import 'styled-components';

import type { ThemeProps } from './theme';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeProps {}
}
