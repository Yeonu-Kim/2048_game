export type ScoreService = {
  getHighScore: (newScore: number, prevHighScore: number) => number;
};

export const implScoreService = (): ScoreService => ({
  getHighScore: (newScore: number, prevHighScore: number) => {
    return newScore > prevHighScore ? newScore : prevHighScore;
  },
});
