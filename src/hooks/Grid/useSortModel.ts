import type { GridSortDirection, GridSortModel } from '@mui/x-data-grid';
import { useState, useCallback } from 'react';

interface SortModel {
  sort: string;
  order: NonNullable<GridSortDirection>;
}

type ApiSortModel = Partial<SortModel>;

const useSortModel = ({
  sort: initialField,
  order: initialSort,
}: ApiSortModel = {}): [
  ApiSortModel,
  GridSortModel,
  (sortModel: GridSortModel) => void,
] => {
  const initialSortModel =
    initialField && initialSort
      ? [
          {
            field: initialField,
            sort: initialSort,
          },
        ]
      : [];

  const [sortModel, setSortModel] = useState<GridSortModel>(initialSortModel);

  const handleSortModelChange = useCallback((newSortModel: GridSortModel) => {
    setSortModel([...newSortModel]);
  }, []);

  const { field, sort } = sortModel[0] ?? {};

  return [
    { sort: field, order: sort ?? undefined },
    sortModel,
    handleSortModelChange,
  ];
};

export default useSortModel;
