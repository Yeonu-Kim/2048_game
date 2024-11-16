import { ThemeProvider } from 'styled-components';

import GlobalStyles from './components/styles/GlobalStyle.styled';
import theme from './components/styles/theme';
import { implLocalStorageRepository } from './infrastructure/localStorageRepository';
import { MainPage } from './page/MainPage';
import { implCellService } from './usecases/cellService';
import { implScoreService } from './usecases/scoreService';
import { implUndoService } from './usecases/undoService';

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
