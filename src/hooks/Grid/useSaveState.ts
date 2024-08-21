import type { GridApi, GridInitialState } from '@mui/x-data-grid';
import type { MutableRefObject } from 'react';
import { useCallback, useEffect, useLayoutEffect } from 'react';
import { useLocalStorage } from 'react-use';

const useSaveState = (
  apiRef: MutableRefObject<GridApi | null>,
  storageKey: string,
) => {
  const [initialState, setInitialState] = useLocalStorage<GridInitialState>(
    storageKey,
    {},
  );

  const saveSnapshot = useCallback(() => {
    if (apiRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { pagination, ...currentState } = apiRef.current.exportState();
      setInitialState(currentState);
    }
  }, [apiRef, setInitialState]);

  useLayoutEffect(() => {
    window.addEventListener('beforeunload', saveSnapshot);

    return () => {
      window.removeEventListener('beforeunload', saveSnapshot);
      saveSnapshot();
    };
  }, [saveSnapshot]);

  useEffect(() => {
    if (initialState && apiRef.current)
      apiRef.current.restoreState(initialState);
  }, [apiRef, initialState]);
};

export default useSaveState;
