import { useState } from 'react';

import Board from './Board.tsx';

const Game = () => {
  const [cells] = useState([
    null,
    null,
    2,
    2,
    2,
    null,
    null,
    null,
    null,
    4,
    null,
    8,
    16,
    32,
    64,
    128,
  ]);

  return <Board cells={cells} />;
};

export default Game;
