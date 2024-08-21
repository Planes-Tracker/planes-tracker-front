import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';

import type { FilterOption } from '@/components/Grid/Toolbar/FiltersButton/types';
import i18n from '@/i18n';
import { ApiFilter } from '@/types/api/Filter';

export const GRID_FILTERS: FilterOption[] = [
  {
    icon: <MilitaryTechIcon />,
    label: i18n.t(`home.grid.filters.${ApiFilter.MILITARY}`),
    value: ApiFilter.MILITARY,
  },
];
