interface DirectionDegreeProps {
  up: 0 | 90 | 180 | 270;
  right: 0 | 90 | 180 | 270;
  down: 0 | 90 | 180 | 270;
  left: 0 | 90 | 180 | 270;
}

const moveCellsByDirection = (
  direction: 'up' | 'down' | 'left' | 'right',
): [0 | 90 | 180 | 270, 0 | 90 | 180 | 270] => {
  const rotateDegree: DirectionDegreeProps = {
    up: 90,
    right: 180,
    down: 270,
    left: 0,
  };

  const revertDegree: DirectionDegreeProps = {
    up: 270,
    right: 180,
    down: 90,
    left: 0,
  };

  return [rotateDegree[direction], revertDegree[direction]];
};

export default moveCellsByDirection;
