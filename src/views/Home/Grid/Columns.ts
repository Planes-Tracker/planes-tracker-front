import type { GridColDef } from '@mui/x-data-grid';

import type { Flight } from '@/services/flight/types';
import { renderFlightPhoto } from '@/views/Home/Grid/render/renderFlightPhoto';

const Columns: GridColDef<Flight>[] = [
  {
    field: 'picture',
    type: 'custom',
    width: 200,
    display: 'flex',
    sortable: false,
    renderCell: renderFlightPhoto,
  },
  {
    field: 'flightId',
    display: 'flex',
  },
  {
    field: 'createdAt',
    type: 'dateTime',
    display: 'flex',
    valueGetter: (value: string) => !!value && new Date(value),
  },
  {
    field: 'updatedAt',
    type: 'dateTime',
    display: 'flex',
    valueGetter: (value: string) => !!value && new Date(value),
  },
  {
    field: 'registration',
    display: 'flex',
  },
  {
    field: 'flight',
    display: 'flex',
  },
  {
    field: 'callsign',
    display: 'flex',
  },
  {
    field: 'origin',
    display: 'flex',
  },
  {
    field: 'destination',
    display: 'flex',
  },
  {
    field: 'divertedTo',
    display: 'flex',
  },
  {
    field: 'model',
    display: 'flex',
  },
  {
    field: 'icaoAddress',
    display: 'flex',
    sortable: false,
  },
];

export default Columns;
