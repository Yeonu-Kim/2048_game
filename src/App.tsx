import { ThemeProvider } from 'styled-components';

import GlobalStyles from './components/styles/GlobalStyle.styled.tsx';
import theme from './components/styles/theme.tsx';
import MainPage from './page/MainPage.tsx';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <MainPage />
    </ThemeProvider>
  );
}

export default App;
