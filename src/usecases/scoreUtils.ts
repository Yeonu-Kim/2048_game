export const getHighScore = (newScore: number, prevHighScore: number) => {
  return newScore > prevHighScore ? newScore : prevHighScore;
};
