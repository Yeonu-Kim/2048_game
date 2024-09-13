import { useState } from 'react';

import Board from './Board.tsx';

const Game = () => {
  const [cells] = useState<(number | null)[][]>(
    Array<null>(4)
      .fill(null)
      .map(() => Array<null>(4).fill(null)),
  );

  return <Board cells={cells} />;
};

export default Game;
