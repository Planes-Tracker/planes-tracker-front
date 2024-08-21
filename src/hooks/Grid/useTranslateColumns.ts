import type { GridColDef, GridValidRowModel } from '@mui/x-data-grid';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const useTranslateColumns = <T extends GridValidRowModel>(
  columns: GridColDef<T>[],
  keyPrefix?: string,
) => {
  const { t } = useTranslation();

  return useMemo(
    () =>
      columns.map((column) => ({
        ...column,
        headerName: t(
          keyPrefix ? `${keyPrefix}.${column.field}` : column.field,
        ),
      })),
    [columns, keyPrefix, t],
  );
};

export default useTranslateColumns;
