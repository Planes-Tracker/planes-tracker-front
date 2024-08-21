import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import MapIcon from '@mui/icons-material/Map';

import routes from '@/routes/routes';

export default [
  {
    label: 'flights',
    icon: <FlightTakeoffIcon />,
    to: routes.index,
  },
  {
    label: 'map',
    icon: <MapIcon />,
    to: routes.map,
  },
];
