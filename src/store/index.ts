import { configureStore } from '@reduxjs/toolkit';

import { flightApi } from '@/services/flight/api';
import { mapApi } from '@/services/map/api';
import { planespottersApi } from '@/services/planespotters/api';
import flightsGridSlice from '@/store/slices/features/flightsGrid';

export const store = configureStore({
  reducer: {
    [flightApi.reducerPath]: flightApi.reducer,
    [mapApi.reducerPath]: mapApi.reducer,
    [planespottersApi.reducerPath]: planespottersApi.reducer,
    flightsGrid: flightsGridSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      flightApi.middleware,
      mapApi.middleware,
      planespottersApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
