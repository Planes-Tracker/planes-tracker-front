/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_URL } from '@/constants';
import type {
  HeatmapPointsCollection,
  MapSettings,
  TrailsFlightPointsCollection,
} from '@/services/map/types';
import { transformApiResponse } from '@/services/utils';

export const mapApi = createApi({
  reducerPath: 'mapApi' as const,
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getMapSettings: builder.query<MapSettings, void>({
      query: () => ({ url: '/map/settings' }),
      transformResponse: transformApiResponse,
    }),
    getHeatmapPoints: builder.query<HeatmapPointsCollection, void>({
      query: () => ({ url: '/map/heatmap' }),
      transformResponse: transformApiResponse,
    }),
    getTrails: builder.query<TrailsFlightPointsCollection, void>({
      query: () => ({ url: '/map/trails' }),
      transformResponse: transformApiResponse,
    }),
  }),
});

export const {
  useGetMapSettingsQuery,
  useGetHeatmapPointsQuery,
  useGetTrailsQuery,
} = mapApi;
