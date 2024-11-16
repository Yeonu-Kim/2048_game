import 'styled-components';

import type { ThemeProps } from '@/components/styles/theme';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeProps {}
}
