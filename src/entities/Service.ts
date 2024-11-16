import type { CellService } from '../usecases/cellService';
import type { ScoreService } from '../usecases/scoreService';
import type { UndoService } from '../usecases/undoService';

export type Services = {
  cellService: CellService;
  scoreService: ScoreService;
  undoService: UndoService;
};
