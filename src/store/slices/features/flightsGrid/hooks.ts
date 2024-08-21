import { useSelector } from 'react-redux';

import { currentFilterSelector } from '@/store/slices/features/flightsGrid';

export const useCurrentGridFilter = () => useSelector(currentFilterSelector);
