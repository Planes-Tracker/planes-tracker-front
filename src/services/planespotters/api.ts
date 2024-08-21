import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { PlanespottersPhotos } from '@/services/planespotters/types';

export const planespottersApi = createApi({
  reducerPath: 'planespottersApi' as const,
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.planespotters.net/pub/photos',
  }),
  endpoints: (builder) => ({
    getPhotoByReg: builder.query<PlanespottersPhotos, string>({
      query: (reg) => ({ url: `/reg/${reg}` }),
    }),
    getPhotoByHex: builder.query<PlanespottersPhotos, string>({
      query: (hex) => ({ url: `/hex/${hex}` }),
    }),
  }),
});

export const { useGetPhotoByRegQuery, useGetPhotoByHexQuery } =
  planespottersApi;
