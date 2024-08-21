import { useRef, useMemo } from 'react';

const useRowCount = (totalItems?: number) => {
  const rowCountRef = useRef(totalItems ?? 0);

  const rowCount = useMemo(() => {
    if (totalItems !== undefined) rowCountRef.current = totalItems;

    return rowCountRef.current;
  }, [totalItems]);

  return rowCount;
};

export default useRowCount;
