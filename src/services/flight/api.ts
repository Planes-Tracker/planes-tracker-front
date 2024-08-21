import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_URL } from '@/constants';
import type {
  Flight,
  FlightCollection,
  GetFlightCollectionParams,
} from '@/services/flight/types';
import { transformApiResponse } from '@/services/utils';

export const flightApi = createApi({
  reducerPath: 'flightApi' as const,
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getFlight: builder.query<Flight, number>({
      query: (id) => ({ url: `/flight/${id.toString()}` }),
      transformResponse: transformApiResponse,
    }),
    getFlights: builder.query<FlightCollection, GetFlightCollectionParams>({
      query: ({ page, pageSize, order, sort, filter }) => ({
        url: `/flights`,
        params: {
          page,
          pageSize,
          order,
          sort,
          filter: filter ?? undefined,
        },
      }),
      transformResponse: transformApiResponse,
    }),
  }),
});

export const { useGetFlightQuery, useGetFlightsQuery } = flightApi;
