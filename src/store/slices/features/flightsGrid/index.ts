import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { FlightsGridState } from '@/store/slices/features/flightsGrid/types';
import type { ApiFilter } from '@/types/api/Filter';

const initialState: FlightsGridState = {
  filter: null,
};

const flightsGridSlice = createSlice({
  name: 'flightsGrid' as const,
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<ApiFilter | null>) => {
      state.filter = action.payload;
    },
  },
  selectors: {
    currentFilterSelector: (state) => state.filter,
  },
});

export const { setFilter } = flightsGridSlice.actions;
export const { currentFilterSelector } = flightsGridSlice.selectors;
export default flightsGridSlice.reducer;
