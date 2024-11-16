import { ThemeProvider } from 'styled-components';

import GlobalStyles from './components/styles/GlobalStyle.styled.tsx';
import theme from './components/styles/theme.tsx';
import { implLocalStorageRepository } from './infrastructure/localStorageRepository.ts';
import { MainPage } from './page/MainPage.tsx';
import { implCellService } from './usecases/cellService.ts';
import { implScoreService } from './usecases/scoreService.ts';
import { implUndoService } from './usecases/undoService.ts';

function App() {
  const localStorageRepository = implLocalStorageRepository();

  const cellService = implCellService({ localStorageRepository });
  const scoreService = implScoreService();
  const undoService = implUndoService();
  const services = {
    cellService,
    scoreService,
    undoService,
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <MainPage services={services} />
    </ThemeProvider>
  );
}

export default App;
