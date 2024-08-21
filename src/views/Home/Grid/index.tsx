import { Box } from '@mui/material';
import type { GridToolbarProps, ToolbarPropsOverrides } from '@mui/x-data-grid';
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  useGridApiRef,
} from '@mui/x-data-grid';
import type { QueryActionCreatorResult } from '@reduxjs/toolkit/query';

import { PAGE_SIZE_OPTIONS } from '@/components/Grid/constants';
import GridToolbarFiltersButton from '@/components/Grid/Toolbar/FiltersButton';
import GridToolbarRefreshButton from '@/components/Grid/Toolbar/RefreshButton';
import getAutoRowHeight from '@/components/Grid/utils/getAutoRowHeight';
import usePaginationModel from '@/hooks/Grid/usePaginationModel';
import useRowCount from '@/hooks/Grid/useRowCount';
import useSaveState from '@/hooks/Grid/useSaveState';
import useSortModel from '@/hooks/Grid/useSortModel';
import useTranslateColumns from '@/hooks/Grid/useTranslateColumns';
import { useGetFlightsQuery } from '@/services/flight/api';
import { useCurrentGridFilter } from '@/store/slices/features/flightsGrid/hooks';
import Columns from '@/views/Home/Grid/Columns';
import { GRID_FILTERS } from '@/views/Home/Grid/contants';

declare module '@mui/x-data-grid' {
  interface ToolbarPropsOverrides {
    refetch: QueryActionCreatorResult<never>;
  }
}

function CustomToolbar({
  refetch,
}: Partial<GridToolbarProps> & ToolbarPropsOverrides) {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFiltersButton options={GRID_FILTERS} />
      <Box sx={{ flexGrow: 1 }} />
      <GridToolbarRefreshButton refetch={refetch} />
    </GridToolbarContainer>
  );
}

const STORAGE_KEY = 'FLIGHTS_GRID_STATE';

function FlightsGrid() {
  const apiRef = useGridApiRef();
  const [pagination, paginationModel, setPaginationModel] = usePaginationModel({
    page: 1,
    pageSize: 10,
  });
  const [sortModel, gridSortModel, handleSortModelChange] = useSortModel({
    sort: 'createdAt',
    order: 'desc',
  });

  const { data, isLoading, isFetching, refetch } = useGetFlightsQuery({
    page: pagination.page,
    pageSize: pagination.pageSize,
    sort: sortModel.sort,
    order: sortModel.order,
    filter: useCurrentGridFilter(),
  });

  const rowCount = useRowCount(data?.totalItems);
  const columns = useTranslateColumns(Columns, 'home.grid.columns');

  useSaveState(apiRef, STORAGE_KEY);

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <DataGrid
        apiRef={apiRef}
        getRowId={(row) => row.flightId}
        rows={data?.items ?? []}
        rowCount={rowCount}
        columns={columns}
        loading={isLoading || isFetching}
        initialState={{
          columns: {
            columnVisibilityModel: {
              flightId: false,
              updatedAt: false,
            },
          },
        }}
        slots={{
          toolbar: CustomToolbar,
        }}
        slotProps={{
          pagination: {
            showFirstButton: true,
            showLastButton: true,
          },
          toolbar: {
            refetch: refetch as unknown as QueryActionCreatorResult<never>,
          },
        }}
        getRowHeight={getAutoRowHeight}
        pageSizeOptions={PAGE_SIZE_OPTIONS}
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        sortingMode="server"
        sortModel={gridSortModel}
        onSortModelChange={handleSortModelChange}
        disableRowSelectionOnClick
        disableColumnFilter
        disableColumnMenu
      />
    </Box>
  );
}

export default FlightsGrid;
