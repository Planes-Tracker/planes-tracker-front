import type { GridPaginationModel } from '@mui/x-data-grid';
import { type Dispatch, type SetStateAction, useState } from 'react';

const usePaginationModel = ({
  page: initialPage = 1,
  pageSize: initialPageSize = 10,
}: GridPaginationModel): [
  GridPaginationModel,
  GridPaginationModel,
  Dispatch<SetStateAction<GridPaginationModel>>,
] => {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: initialPage - 1,
    pageSize: initialPageSize,
  });

  const { page, pageSize } = paginationModel;

  return [{ page: page + 1, pageSize }, paginationModel, setPaginationModel];
};

export default usePaginationModel;
