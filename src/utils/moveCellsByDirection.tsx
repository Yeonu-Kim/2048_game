import type {
  DirectionType,
  RotateDegreeType,
} from '../components/types/GameType';

interface DirectionDegreeProps {
  up: RotateDegreeType;
  right: RotateDegreeType;
  down: RotateDegreeType;
  left: RotateDegreeType;
}

const moveCellsByDirection = (
  direction: DirectionType,
): [RotateDegreeType, RotateDegreeType] => {
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
