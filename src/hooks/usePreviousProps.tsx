import { useEffect, useRef } from 'react';

const usePreviousProps = (value: number | null) => {
  const ref = useRef<number | null>();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};

export default usePreviousProps;
